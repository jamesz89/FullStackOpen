import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { initializeBlogs } from '../reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { useComments } from '../hooks/useComments'

const BlogDetails = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const { id } = useParams()
  const blog = blogs.find((blog) => blog.id === id)

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserToken) {
      dispatch(initializeBlogs())
    }
  }, [])

  const { comments } = useComments(id)

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <span>{blog.url}</span>
      <br/>
      <span>{blog.likes} likes </span>
      <button onClick={handleLike}>like</button>
      <br/>
      <span>added by {blog.user.name}</span>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogDetails
