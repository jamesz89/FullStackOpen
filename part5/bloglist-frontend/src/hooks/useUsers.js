import { useState, useEffect } from 'react'
import userService from '../services/users'

export const useUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await userService.getAll()
      setUsers(data)
    }
    fetchUsers()
  }, [])

  return {
    users,
  }
}
