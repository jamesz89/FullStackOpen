const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (request.token) {
    try {
      request.decodedToken = await jwt.verify(request.token, process.env.SECRET)
    } catch(error){
      next(error)
    }
  } else {
    return response.status(401).json({error: 'token is missing'})
  }

  const user = await User.findById(request.decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author ? body.author : 'Anonymus',
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  const blog = await Blog.findById(id)

  if (request.token) {
    try {
      request.decodedToken = await jwt.verify(request.token, process.env.SECRET)
    } catch(error){
      next(error)
    }
  } else {
    return response.status(401).json({error: 'token is missing'})
  }
  
  try {
    if (blog.user.toString() === request.decodedToken.id.toString()) {
      await Blog.findByIdAndDelete(id)
      response.status(204).end()
    } else {
      return response.status(401).json({ error: 'you have no permission to do that' })
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
    response.json(updatedBlog)

  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter