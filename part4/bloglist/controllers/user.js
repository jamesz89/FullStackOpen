const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const {body, validationResult} = require('express-validator')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRouter.post('/',
  body('username').exists().isLength({ min: 3 }),
  body('password').exists().isLength({ min: 3 }),

  async (request, response, next) => {
    const errorFormatter = ({location, msg, param}) => {
      return `${location}[${param}]: ${msg}`
    }
    const result = await validationResult(request).formatWith(errorFormatter)
    if (!result.isEmpty()) {
      return response.status(400).json(result.mapped())
    }

    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })
    try {
      const savedUser = await user.save()
      response.json(savedUser)

    } catch (error) {
      next(error)
    }
  })

module.exports = usersRouter