import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducers = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer
})

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store