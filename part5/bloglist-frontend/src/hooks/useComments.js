import { useState, useEffect } from 'react'
import commentService from '../services/comments'

export const useComments = (id) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchComments = async () => {
      const data = await commentService.getAll(id)
      setComments(data)
    }
    fetchComments()
  }, [])

  return {
    comments,
  }
}
