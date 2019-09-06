'use strict'

const express = require('express')
const userRouter = require('./user')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Connected to Fancy Todo Apps!'
  })
})

// Routing
router.use('/users', userRouter)

module.exports = router