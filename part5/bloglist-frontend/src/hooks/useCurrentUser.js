import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'

export const useCurrentUser = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserToken) {
      dispatch(initializeBlogs())
    }
  }, [])

}