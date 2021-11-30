import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => {
    return blogs.sort((a,b) => b.likes - a.likes)
  })

  const dispatch = useDispatch()

  // const updateBlog = async (blogtoUpdate) => {
  //   const id = blogtoUpdate.id
  //   const blogObject = {
  //     title: blogtoUpdate.title,
  //     author: blogtoUpdate.author,
  //     url: blogtoUpdate.url,
  //     likes: blogtoUpdate.likes,
  //   }
  //   await blogService.update(id, blogObject)
  // }

  // const deleteBlog = async (id) => {
  //   await blogService.remove(id)
  // }

  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserToken) {
      // const user = JSON.parse(loggedUserToken)
      // setUser(user)
      // blogService.setToken(user.token)
      // blogService.getAll().then((blogs) => setBlogs(blogs))
      dispatch(initializeBlogs())
    }
  }, [])

  return (
    <div className="bloglist">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          // handleUpdateBlog={updateBlog}
          blogs={blogs}
          // setBlogs={setBlogs}
          // handleDeleteBlog={deleteBlog}
        />
      ))}
    </div>
  )
}

export default BlogList