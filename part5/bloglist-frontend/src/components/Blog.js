import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <tr className="blog">
      <td>
        <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
      </td>
    </tr>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
