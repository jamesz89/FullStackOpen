import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS': {
    return action.data
  }
  case 'ADD_BLOG' : {
    const newBlog = {
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

export const createBlog = (newBlog) => {
  return async dispatch => {
    const data = await blogService.create({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes
    })
    dispatch({
      type: 'ADD_BLOG',
      data
    })
  }
}

export default blogReducer