'use strict'

const jwt = require('jsonwebtoken')
const SECRET_JWT = process.env.SECRET_JWT

module.exports = {
  generateToken(payload) {
    return jwt.sign(payload, SECRET_JWT)
  },
  verifyToken(token) {
    return jwt.verify(token, SECRET_JWT)
  }
}
