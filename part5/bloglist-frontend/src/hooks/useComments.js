import { useState, useEffect } from 'react'
import commentService from '../services/comments'

export const useComments = (id) => {
  const [list, setList] = useState([])

  useEffect(() => {
    const fetchComments = async () => {
      const data = await commentService.getAll(id)
      setList(data)
    }
    fetchComments()
  }, [])

  const post = async (id, newComment) => {
    const data =  await commentService.create(id, newComment)
    setList(list.concat(data))
  }

  return {
    list,
    post
  }
}
