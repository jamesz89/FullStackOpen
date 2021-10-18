import React from 'react'
const Blog = ({blog}) => (
  <li>
    <span>"{blog.title}" - {blog.author}</span>
  </li>  
)

export default Blog