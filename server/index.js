const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const { Photon } = require('@generated/photon')
const photon = new Photon()

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const HAXCMS_AUTH_SECRET = process.env.HAXCMS_AUTH_SECRET

async function main() {
  await photon.connect()
  const app = express()
  app.use(cors())
  app.use(bodyParser.json())

  app.get('/login', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user:email,read:user`)
  })

  app.get('/login/callback', async (req, res, next) => {
    const { code } = req.query
    // get the access token
    const { access_token } = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code
      })
    }).then(_res => _res.json())

    // get the username from github
    const userFetch = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${access_token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: " \
      { \
        \"query\": \"query { viewer { login email }}\" \
      } \
    "
    }).then(_res => _res.json())

    // check to see if that user is in the system.
    if (typeof userFetch.data !== 'undefined') {
      const userName = userFetch.data.viewer.login
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
        })
        res.send(user)
      } catch (error) {
        next(error)
      }
    }

    res.status('403')
    res.send('User not found')
  })

  app.listen(3000, () => {
    console.log("express server started on 3000")
  })
}

main().catch(e => {
  console.error(e)
}).finally(async () => {
})