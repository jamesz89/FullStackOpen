import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleUpdateBlog, blogs, setBlogs, handleDeleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const showWhenVisible = { display: showDetails ? '' : 'none' }

  const addLike = () => {
    const blogToUpdate = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    const updatedBlogs = [...blogs]
    const blogIndex = updatedBlogs.findIndex(
      (currentBlog) => currentBlog.id === blog.id
    )
    updatedBlogs.splice(blogIndex, 1, blogToUpdate)
    setBlogs(updatedBlogs)
    handleUpdateBlog(blogToUpdate)
  }

  const removeBlog = () => {
    const updatedBlogs = [...blogs]
    const blogIndex = updatedBlogs.findIndex(
      (currentBlog) => currentBlog.id === blog.id
    )
    updatedBlogs.splice(blogIndex, 1)
    setBlogs(updatedBlogs)
    handleDeleteBlog(blog.id)
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        <span className='title'>{blog.title}</span>
        <span className='author'> by {blog.author} </span>
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'show'}
        </button>
        <div className='blog-details' style={showWhenVisible}>
          <span>{blog.url}</span>
          <br />
          <span className="likes">{blog.likes}</span>
          <span>likes</span>
          <button className='btn-like' onClick={addLike}>like</button>
          <br />
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleUpdateBlog: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs:PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired
}

export default Blog
