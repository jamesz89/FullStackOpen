import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { showElement, hideElement } from '../reducers/togglableReducer'

const Togglable = ({ buttonLabel, children }) => {
  const visibility = useSelector((state) => state.visibility)

  const dispatch = useDispatch()

  const showWhenVisible = { display: visibility ? '' : 'none' }
  const hideWhenVisible = { display: visibility ? 'none' : '' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button id="create" onClick={() => dispatch(showElement())}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button id="cancel" onClick={() => dispatch(hideElement())}>cancel</button>
      </div>
    </div>
  )
}

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
