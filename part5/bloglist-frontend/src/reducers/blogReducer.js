import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS': {
    return action.data
  }
  case 'ADD_BLOG' : {
    const newBlog = {
      id: action.data.id,
      title: action.data.title,
      author: action.data.author,
      url: action.data.url,
      likes: action.data.likes
    }
    return state.concat(newBlog)
  }
  case 'LIKE_BLOG': {
    const id = action.id
    const blogToLike = state.find((blog) => blog.id === id)
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1
    }
    const newState = state.map((blog) => blog.id !== id ? blog : likedBlog)
    return newState
  }
  case 'DELETE_BLOG': {
    const id = action.id
    return state.filter(blog => blog.id !== id)
  }
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      data: {
        id: newBlog.id,
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
        likes: 0
      }
    })
  }
}

export const likeBlog = (blog) => {
  const newBlog = {
    id: blog.id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1
  }
  return async dispatch => {
    await blogService.update(newBlog)
    dispatch({
      type: 'LIKE_BLOG',
      id: blog.id
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      id
    })
  }
}

export default blogReducer