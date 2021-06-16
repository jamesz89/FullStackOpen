const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const blogsRouter = require('./controllers/blog')
const usersRouter = require('../bloglist/controllers/user')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


logger.info('Connecting to MongoDB')

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(logger.info('connection with MongoDB established'))
  .catch(error => {
    logger.error(error)
  })

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app