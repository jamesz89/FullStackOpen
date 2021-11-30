import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import togglableReducer from './reducers/togglableReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducers = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  visibility: togglableReducer
})

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store