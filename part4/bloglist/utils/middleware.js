const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: 'bad request' })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

const userExtractor = async (request, response, next) => {
  if (request.token) {
    try {
      request.decodedToken = await jwt.verify(request.token, process.env.SECRET)
    } catch(error){
      next(error)
    }
  } else {
    return response.status(401).json({error: 'token is missing'})
  }

  request.user = await User.findById(request.decodedToken.id)
  next()
}

module.exports = {
  userExtractor,
  tokenExtractor,
  unknownEndpoint,
  errorHandler
}
