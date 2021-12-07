import React from 'react'
import { Link } from 'react-router-dom'

const headerStyle = {
  fontWeight: 'bold',
}

const UserList = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <table cellPadding="3">
        <thead>
          <tr>
            <td></td>
            <td style={headerStyle}>blogs created</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td align="right">{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
