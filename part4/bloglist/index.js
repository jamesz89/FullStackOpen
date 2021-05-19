const config = require('./utils/config')
const express = require('express')
const app = express()
const Blog = require('./models/blog')
const cors = require('cors')
const morgan = require('morgan')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
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

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog
    .save()
    .then(savedBlog => {
      response.status(201).json(savedBlog)
    })
    .catch(error => logger.error(error))
})

app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)

const PORT = config.PORT

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})