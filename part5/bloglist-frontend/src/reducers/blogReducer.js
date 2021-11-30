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

export default blogReducer