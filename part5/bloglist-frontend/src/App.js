import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogObject, setblogObject] = useState({ title: '', author: '', url: '', likes: 0 })

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      blogService.getAll().then(blogs => setBlogs(blogs))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('logging out')
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const createBlog = async (event) => {
    event.preventDefault()
    try {
      console.log('adding blog to list')
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setblogObject(prevState => { return { ...prevState, title: ''} })
      setblogObject(prevState => { return { ...prevState, author: ''} })
      setblogObject(prevState => { return { ...prevState, url: ''} })
      console.log('new entry added')
    } catch (exception) {
      console.log(exception)
    }
  }


  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserToken) {
      const user = JSON.parse(loggedUserToken)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs => setBlogs(blogs))
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <form onSubmit={handleLogin}>
          <label>username</label>
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <br />
          <label>password</label>
          <input
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
      <h2>Create new entry</h2>

      <form onSubmit={createBlog}>
        <label name="title">title</label>
        <input
          type="text"
          name="title"
          value={blogObject.title}
          onChange={({ target }) => setblogObject(prevState => { return { ...prevState, title: target.value } })}
        />
        <br />
        <label name="author">author</label>
        <input
          type="text"
          name="author"
          value={blogObject.author}
          onChange={({ target }) => setblogObject(prevState => { return { ...prevState, author: target.value } })}
        />
        <br />
        <label name="url">url </label>
        <input
          type="text"
          name="url"
          value={blogObject.url}
          onChange={({ target }) => setblogObject(prevState => { return { ...prevState, url: target.value } })}
        />
        <br />
        <button type="submit">create</button>
      </form>

      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      <button type="submit" onClick={handleLogout}>logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App