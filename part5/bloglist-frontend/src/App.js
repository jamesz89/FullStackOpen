import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import loginService from './services/login'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { login, logout } from './reducers/userReducer'
import UserDetails from './components/UserDetails'
import BlogDetails from './components/BlogDetails'

const App = () => {
  const user = useSelector(({ user }) => user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      dispatch(login(user))
    } catch (exception) {
      dispatch(setNotification('All fields are required', 5))
      console.log(exception)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(logout())
  }

  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserToken) {
      const user = JSON.parse(loggedUserToken)
      dispatch(login(user))
    }
  }, [])

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
    <Router>
      <h2>Blogs</h2>
      <p>
        {user.name} ({user.username}) is logged in
      </p>
      <button type="submit" onClick={handleLogout}>
        logout
      </button>
      <Notification/>
      <br />
      <Routes>
        <Route path="/" element={<BlogList/>}/>
        <Route path="/users/" element={<UserList />}/>
        <Route path="/users/:id" element={<UserDetails />}/>
        <Route path="/blogs/:id" element={<BlogDetails/>}/>
      </Routes>
    </Router>
  )
}
export default App
