import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('All fields are required', 5))
      console.log(exception)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('logging out')
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const togglableRef = useRef()

  const createBlog = async (newBlog) => {
    try {
      console.log('adding blog to list')
      togglableRef.current.toggleVisibility()
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      console.log('new entry added')
      dispatch(setNotification(`A blog named "${newBlog.title}" by ${newBlog.author} has beed added`, 5))
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('All fields are required', 5))
    }
  }

  const updateBlog = async (blogtoUpdate) => {
    const id = blogtoUpdate.id
    const blogObject = {
      title: blogtoUpdate.title,
      author: blogtoUpdate.author,
      url: blogtoUpdate.url,
      likes: blogtoUpdate.likes,
    }
    await blogService.update(id, blogObject)
  }

  const deleteBlog = async (id) => {
    await blogService.remove(id)
  }

  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserToken) {
      const user = JSON.parse(loggedUserToken)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then((blogs) => setBlogs(blogs))
    }
  }, [])

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <label>username</label>
          <input id="username"
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <br />
          <label>password</label>
          <input id="password"
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <br />
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>
        {user.name} ({user.username}) is logged in
      </p>
      <button type="submit" onClick={handleLogout}>
        logout
      </button>
      <Notification/>
      <Togglable buttonLabel="create a new blog" ref={togglableRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <br />
      <div className="bloglist">
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleUpdateBlog={updateBlog}
            blogs={blogs}
            setBlogs={setBlogs}
            handleDeleteBlog={deleteBlog}
          />
        ))}
      </div>
    </div>
  )
}
export default App
