import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog, initializeBlogs, likeBlog } from '../reducers/blogReducer'
import Blog from './Blog'

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

  const handleLike = (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = (id) => {
    dispatch(deleteBlog(id))
  }

  return (
    <div className="bloglist">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  )
}

export default BlogList