import React from 'react'
import { Link } from 'react-router-dom'

const navigationBarStyles = {
  backgroundColor: '#D4D4D4',
  padding: '5px'
}

const NavigationBar = ({ user, handleLogout }) => {
  return(
    <div style={navigationBarStyles}>
      <span> <Link to={'/'}>Blogs</Link> </span>
      <span> <Link to={'/users'}>Users</Link> </span>
      <span> {user.name} ({user.username}) is logged in </span>
      <button type="submit" onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}

export default NavigationBar
