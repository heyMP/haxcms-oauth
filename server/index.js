require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fetch = require("node-fetch");
const { Photon } = require("@generated/photon");
const photon = new Photon();
const jwt = require("jsonwebtoken");
const { ApolloServer, gql } = require("apollo-server-express");

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const HAXCMS_OAUTH_JWT_SECRET = process.env.HAXCMS_OAUTH_JWT_SECRET;
const FQDN = process.env.FQDN;
const SCOPE = process.env.SCOPE;

async function main() {
  await photon.connect();
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.get("/", (req, res) => {
    const { authorization } = req.cookies;
    if (authorization) {
      // Decode jwt
      const verify = jwt.verify(authorization, HAXCMS_OAUTH_JWT_SECRET);
      res.send(`Hi ${verify.name} <a href="/logout">Logout</a>`);
    } else {
      res.send(`<a href="/login">Sign in with Github</a>`);
    }
  });

  app.get("/logout", (req, res) => {
    // When deleting a cookie you need to also include the path and domain
    res.clearCookie('authorization', { domain: SCOPE })
    res.redirect('/')
  });

  app.get("/login", (req, res) => {
    const redirect =
      typeof req.query.redirect !== "undefined"
        ? `redirect=${req.query.redirect}`
        : `redirect=${req.headers["x-forwarded-proto"]}://${
            req.headers["x-forwarded-host"]
          }`;
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user:email,read:user,public_repo&redirect_uri=${FQDN}/login/callback?${redirect}`
    );
  });

  app.get("/login/callback", async (req, res, next) => {
    const { code } = req.query;
    // get the access token
    const { access_token } = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code
        })
      }
    ).then(_res => _res.json());

    // get the username from github
    const userFetch = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${access_token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body:
        ' \
      { \
        "query": "query { viewer { login email }}" \
      } \
    '
    }).then(_res => _res.json());

    const userName = userFetch.data.viewer.login;
    try {
      const user = await photon.users.upsert({
        where: { name: userName },
        update: {
          githubAccessToken: access_token
        },
        create: {
          name: userName,
          githubAccessToken: access_token
        }
      });

      // Create JWT for the user
      const jwtToken = await jwt.sign(
        { name: user.name },
        HAXCMS_OAUTH_JWT_SECRET
      );

      // if the user specified a redirect url then redirect with a cookie
      res.cookie("authorization", jwtToken, {
        maxAge: 900000,
        httpOnly: true,
        domain: SCOPE
      });
      res.redirect(req.query.redirect);
    } catch (error) {
      next(error);
    }
  });

  const apolloServer = new ApolloServer({
    typeDefs: gql`
      type User {
        id: String
        name: String
        githubAccessToken: String
        email: String
      }

      type Query {
        users: [User]
        user(name: String!): User
      }
    `,
    resolvers: {
      Query: {
        users: async () => await photon.users(),
        user: async (parent, { name }, ctx) =>
          await photon.users.findOne({ where: { name } })
      }
    }
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
    );
  });
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {});
