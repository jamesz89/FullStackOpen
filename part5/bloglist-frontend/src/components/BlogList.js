import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useCurrentUser } from '../hooks/useCurrentUser'

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => {
    return blogs.sort((a,b) => b.likes - a.likes)
  })

  useCurrentUser()

  return (
    <div className="bloglist">
      <Togglable buttonLabel="create a new blog">
        <BlogForm />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )
}

export default BlogList