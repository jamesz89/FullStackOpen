import React, { useEffect, useState } from 'react'
import userService from '../services/users'

const headerStyle = {
  fontWeight: 'bold',
}

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await userService.getAll()
      setUsers(data)
    }
    fetchUsers()
  }, [])

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
              <td>{user.name}</td>
              <td align="right">{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
