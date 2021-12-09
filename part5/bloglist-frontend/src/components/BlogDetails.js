import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { initializeBlogs } from '../reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { useComments } from '../hooks/useComments'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Form, Table } from 'react-bootstrap'

const BlogDetails = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const { id } = useParams()
  const blog = blogs.find((blog) => blog.id === id)
  const [commentValue, setCommentValue] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserToken) {
      dispatch(initializeBlogs())
    }
  }, [])

  const comments = useComments(id)

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleCommentChange = ({ target }) => {
    setCommentValue(target.value)
  }

  const handleCommentPost = (event) => {
    event.preventDefault()
    if (commentValue) {
      console.log('adding comment', commentValue)
      comments.post(id, { content: commentValue })
      setCommentValue('')
    } else {
      dispatch(setNotification('No empty comments', 5))
    }
  }

  if (!blog) {
    return null
  }
  return (
    <div className="mt-4">
      <div className="d-flex flex-row">
        <h2>{blog.title} by {blog.author}</h2>
        <Button className="btn-success px-4 ml-4" onClick={handleLike}>Like</Button>
      </div>
      <div className="d-flex flex-column mb-3">
        <div>Url: <a href={blog.url}>{blog.url}</a></div>
        <div>Likes: {blog.likes}</div>
        <div>Added by {blog.user.name}</div>
      </div>
      <h3 className="my-4">Comments</h3>
      <Form className="d-flex flex-row my-3" onSubmit={handleCommentPost}>
        <Form.Control
          className="w-50"
          type="text"
          value={commentValue}
          onChange={handleCommentChange}/>
        <Button className="w-25 ml-3" type="submit">Add comment</Button>
      </Form>
      <Table striped bordered hover className="w-100">
        <tbody>
          {comments.list.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.content}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogDetails
