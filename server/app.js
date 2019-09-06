'use strict'

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

// Modules
const express = require('express')
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/fancy-todo', { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('mongoose connected to MongoDB database')
  }).catch((err) => {
    console.log(err, 'mongoose could not connected to MongoDB database')
  })

// Initial middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Load cors
app.use(cors())

// Load router module on the app.js
app.use('/', router)

// Error handler
app.use(errorHandler)

// Start the server
app.listen(PORT, () => console.log(`Magic happens on port ${PORT}`))
