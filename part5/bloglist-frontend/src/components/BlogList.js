import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { initializeBlogs } from '../reducers/blogReducer'
import { Table } from 'react-bootstrap'

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
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="Add a new blog">
        <BlogForm />
      </Togglable>
      <Table striped bordered hover>
        <tbody>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
            />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList