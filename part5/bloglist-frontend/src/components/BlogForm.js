import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { hideElement } from '../reducers/togglableReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleTitleChange = ({ target }) => {
    setTitle(target.value)
  }

  const handleAuthorChange = ({ target }) => {
    setAuthor(target.value)
  }

  const handleUrlChange = ({ target }) => {
    setUrl(target.value)
  }

  const handleBlogCreation = (event => {
    event.preventDefault()
    if (title, author, url) {
      setTitle('')
      setAuthor('')
      setUrl('')
      dispatch(hideElement())
      dispatch(createBlog({ title, author, url, likes:0 }))
      dispatch(setNotification(`A blog named "${title}" by ${author} has beed added`, 5))
    } else {
      dispatch(setNotification('All fields are required', 5))
    }
  })

  return (
    <form className='form' onSubmit={handleBlogCreation}>
      <h2>Create new entry</h2>
      <label name="title">title</label>
      <input id='title'
        type="text"
        name="title"
        value={title}
        onChange={handleTitleChange}
      />
      <br />
      <label name="author">author</label>
      <input id='author'
        type="text"
        name="author"
        value={author}
        onChange={handleAuthorChange}
      />
      <br />
      <label name="url">url</label>
      <input id='url' type="text" name="url" value={url} onChange={handleUrlChange} />
      <br />
      <button id="save" type="submit">create</button>
    </form>
  )
}

export default BlogForm
