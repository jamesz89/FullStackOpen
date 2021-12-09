import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import loginService from './services/login'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { login, logout } from './reducers/userReducer'
import UserDetails from './components/UserDetails'
import BlogDetails from './components/BlogDetails'
import NavigationBar from './components/NavigationBar'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'



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
      <Container className="mt-5">
        <Row>
          <Col md="12">
            <h2 className="text-center">Blogs App</h2>
            <Notification />
            <Form onSubmit={handleLogin}>
              <Form.Group id="username">
                <Form.Label>username</Form.Label>
                <Form.Control id="username"
                  type="text"
                  name="Username"
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
              </Form.Group>

              <Form.Group id="password">
                <Form.Label>password</Form.Label>
                <Form.Control
                  type="password"
                  name="Password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </Form.Group>
              <Button className="mt-4" id="form-login-button" variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Router>
      <NavigationBar user={user} handleLogout={handleLogout}/>
      <Container>
        <Notification/>
        <Routes>
          <Route path="/" element={<BlogList/>}/>
          <Route path="/users/" element={<UserList />}/>
          <Route path="/users/:id" element={<UserDetails />}/>
          <Route path="/blogs/:id" element={<BlogDetails/>}/>
        </Routes>
      </Container>
    </Router>
  )
}
export default App
