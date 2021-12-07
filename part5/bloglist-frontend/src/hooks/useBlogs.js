import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

export const useBlogs = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await blogService.getAll()
      setBlogs(data)
    }
    fetchUsers()
  }, [])

  return {
    blogs,
  }
}