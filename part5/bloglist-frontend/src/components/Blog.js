import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const showWhenVisible = { display: showDetails ? '' : 'none' }

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
          <span> likes</span>
          <button className='btn-like' onClick={() => handleLike(blog)}>like</button>
          <br />
          <button onClick={() => handleDelete(blog.id)}>remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog
