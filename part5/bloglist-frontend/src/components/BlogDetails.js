import React from 'react'
import { useParams } from 'react-router'
import { useBlogs } from '../hooks/useBlogs'
// import { useDispatch } from 'react-redux'
// import { likeBlog } from '../reducers/blogReducer'

const BlogDetails = () => {
  const { blogs } = useBlogs()
  const { id } = useParams()
  const blog = blogs.find((blog) => blog.id === id)

  // const dispatch = useDispatch()

  // const handleLike = () => {
  //   dispatch(likeBlog(blog))
  // }

  // const handleDelete = (id) => {
  //   dispatch(deleteBlog(id))
  // }

  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <br/>
      <span>{blog.url}</span>
      <br/>
      <span>{blog.likes} likes </span>
      <button>like</button>
      <br/>
      <span>added by {blog.user.name}</span>
    </div>
  )
}

export default BlogDetails
