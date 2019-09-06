'use strict'

const { OAuth2Client } = require('google-auth-library')
const { generateToken } = require('../helpers/jwt')
const User = require('../models/user')

class UserController {
  static signInGoogle(req, res, next) {
    let payload = null
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then((ticket) => {
        payload = ticket.getPayload()
        const { email } = payload

        return User.findone({ email })
      })
      .then((user) => {
        if (user) {
          return user
        } else {
          return User.create({
            email: payload.email,
            password: process.env.DEFAULT_PASSWORD
          })
        }
      })
      .then((user) => {
        payload = { _id: user.id, email: user.email }
        let token = generateToken(payload)
        res.status(201).json({ token })
      })
      .catch(next)
  }
}

module.exports = UserController