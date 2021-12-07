import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { initializeBlogs } from '../reducers/blogReducer'

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => {
    return blogs.sort((a,b) => b.likes - a.likes)
  })

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserToken) {
      dispatch(initializeBlogs())
    }
  }, [dispatch])

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