import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    width: '600px',
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: props.notification.visibility ? '' : 'none'
  }
  return (
    <div style={style}>
      {props.notification.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification