// External packages
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

// Utils
const config = require('./utils/config')
const logger = require('./utils/logger')

// Routes
const blogsRouter = require('./controllers/blogs')

mongoose.set('strictQuery', true)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app