const commentsRouter = require('express').Router()
const Comment = require('../models/comment')

commentsRouter.get('/:id/comments', async (request, response) => {
  const blogId = request.params.id
  const comments = await Comment.find({blog:blogId})
  response.json(comments)
})

commentsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body
  const blogId = request.params.id

  const comment = new Comment({
    content: body.content,
    blog: blogId
  })

  try {
    const savedComment = await comment.save()
    response.status(201).json(savedComment)
  } catch (error) {
    next(error)
  }
})

module.exports = commentsRouter