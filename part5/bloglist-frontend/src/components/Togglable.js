import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { showElement, hideElement } from '../reducers/togglableReducer'
import { Button } from 'react-bootstrap'

const Togglable = ({ buttonLabel, children }) => {
  const visibility = useSelector((state) => state.visibility)

  const dispatch = useDispatch()

  const showWhenVisible = { display: visibility ? '' : 'none' }
  const hideWhenVisible = { display: visibility ? 'none' : '' }

  return (
    <div>
      <div className="d-flex" style={hideWhenVisible}>
        <Button className="mb-3" id="create" onClick={() => dispatch(showElement())}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button className="mb-3" id="cancel" onClick={() => dispatch(hideElement())}>Cancel</Button>
      </div>
    </div>
  )
}

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
