import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = ({ target }) => {
    setTitle(target.value)
  }

  const handleAuthorChange = ({ target }) => {
    setAuthor(target.value)
  }

  const handleUrlChange = ({ target }) => {
    setUrl(target.value)
  }

  const createNewBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url, likes:0 })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={createNewBlog}>
      <h2>Create new entry</h2>
      <label name="title">title</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleTitleChange}
      />
      <br />
      <label name="author">author</label>
      <input
        type="text"
        name="author"
        value={author}
        onChange={handleAuthorChange}
      />
      <br />
      <label name="url">url</label>
      <input type="text" name="url" value={url} onChange={handleUrlChange} />
      <br />
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
