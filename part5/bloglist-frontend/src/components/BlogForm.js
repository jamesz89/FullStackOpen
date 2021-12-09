import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { hideElement } from '../reducers/togglableReducer'
import { Form, Button } from 'react-bootstrap'

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
    <Form className='form' onSubmit={handleBlogCreation}>
      <Form.Group>
        <Form.Label name="title">title</Form.Label>
        <Form.Control id='title'
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label name="author">author</Form.Label>
        <Form.Control id='author'
          type="text"
          name="author"
          value={author}
          onChange={handleAuthorChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label name="url">url</Form.Label>
        <Form.Control id='url' type="text" name="url" value={url} onChange={handleUrlChange} />
      </Form.Group>
      <Button className="my-2" id="save" type="submit">Create</Button>
    </Form>
  )
}

export default BlogForm
