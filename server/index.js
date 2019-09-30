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
const HAXCMS_OAUTH_JWT_REFRESH_SECRET = process.env.HAXCMS_OAUTH_JWT_REFRESH_SECRET;
const FQDN = process.env.FQDN;
const SCOPE = process.env.SCOPE;


async function main() {
  await photon.connect();
  const app = express();

  const getUserFromAuthHeader = (req) => {
    if (typeof req.headers.authorization !== 'undefined') {
      const access_token = req.headers.authorization.split(' ')[1]
      const user = jwt.verify(access_token, HAXCMS_OAUTH_JWT_SECRET)
      return user
    }
  }

  app.use(cors({
    credentials: true
  }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  /**
   * Allow calls from web components with cookies
   */
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    next()
  })

  // Make sure that there isn't a scenario where the user is logged in but they
  // don't exist in the database
  app.use(async (req, res, next) => {
    try {
      const { access_token } = req.cookies;
      if (access_token) {
        const { name } = jwt.verify(access_token, HAXCMS_OAUTH_JWT_SECRET);
        await photon.users.findOne({ where: { name } });
      }
    } catch (error) {
      delete req.cookies.access_token;
      res.clearCookie("access_token", { domain: SCOPE });
    }
    next();
  });

  app.get("/auth", async (req, res) => {
    // Decode jwt
    try {
      const { refresh_token } = req.cookies;
      const { name } = jwt.verify(refresh_token, HAXCMS_OAUTH_JWT_REFRESH_SECRET);
      res.status(200);
      res.send('OK')
    } catch (error) {
      const redirect = typeof req.headers['x-forwarded-host'] !== 'undefined' ? `redirect=${req.headers['x-forwarded-proto']}://${req.headers['x-forwarded-host']}` : ``
      res.redirect(`/login/?${redirect}`);
    }
  });

  app.get("/", (req, res) => {
    const { access_token } = req.cookies;
    if (access_token) {
      // Decode jwt
      const verify = jwt.verify(access_token, HAXCMS_OAUTH_JWT_SECRET);
      res.send(`Hi ${verify.name} <a href="/logout">Logout</a>`);
    } else {
      res.send(`<a href="/login">Sign in with Github</a>`);
    }
  });

  app.get('/access_token', async (req, res) => {
    const { refresh_token } = req.cookies;
    if (refresh_token) {
      const { name } = jwt.verify(refresh_token, HAXCMS_OAUTH_JWT_REFRESH_SECRET);
      const jwtToken = await jwt.sign({ name }, HAXCMS_OAUTH_JWT_SECRET);
      res.json(jwtToken)
    }
  })

  app.get("/logout", (req, res) => {
    // When deleting a cookie you need to also include the path and domain
    res.clearCookie("access_token", { domain: SCOPE });
    res.clearCookie("refresh_token", { domain: SCOPE });
    res.redirect("/");
  });

  app.get("/login", (req, res) => {
    // get a redirect query parameter
    const redirect =
      // if we have a redirect query then use it
      typeof req.query.redirect !== "undefined"
        ? `redirect=${req.query.redirect}`
        : // else if there is an x-forwared-host defined then use that
        typeof req.headers["x-forwarded-host"] !== "undefined"
        ? `redirect=${req.headers["x-forwarded-proto"]}://${
            req.headers["x-forwarded-host"]
          }`
        : // else just redirect to the home page.
          `redirect=/`;

    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user:email,read:user,public_repo&redirect_uri=${FQDN}/login/callback?${redirect}`
    );
  });

  app.get("/login/callback", async (req, res, next) => {
    const { code } = req.query;

    try {
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
      const refreshJwtToken = await jwt.sign(
        { name: user.name },
        HAXCMS_OAUTH_JWT_REFRESH_SECRET,
        {
          expiresIn: '7d'
        }
      );

      // if the user specified a redirect url then redirect with a cookie
      res.cookie("refresh_token", refreshJwtToken, {
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
        user: User
      }
    `,
    resolvers: {
      Query: {
        users: async () => await photon.users(),
        user: async (parent, _, ctx) => await photon.users.findOne({ where: { name: ctx.user.name } })
      }
    },
    context: ({req}) => ({
      user: getUserFromAuthHeader(req)
    })
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
