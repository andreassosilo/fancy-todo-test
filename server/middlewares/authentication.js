'use strict'

const { verifyToken } = require('../helpers/jwt')

module.exports = {
  authentication(req, res, next) {
    try {
      const decode = verifyToken(req.headers.token)
      req.decode = decode
      next()
    } catch (err) {
      next({ status: 401, message: 'You must sign in first!' })
    }
  }
}
