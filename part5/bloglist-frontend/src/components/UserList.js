import React from 'react'
import { useUsers } from '../hooks/useUsers'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const headerStyle = {
  fontWeight: 'bold',
}

const UserList = () => {
  const { users } = useUsers()

  if (!users) {
    return null
  }

  return (
    <div className="mt-4">
      <h2>Users</h2>
      <Table className="w-50" bordered striped hover>
        <thead>
          <tr>
            <td></td>
            <td align="right" style={headerStyle}>blogs created</td>
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
      </Table>
    </div>
  )
}

export default UserList
