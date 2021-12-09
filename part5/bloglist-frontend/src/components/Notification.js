import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const style = {
    display: notification.visibility ? '' : 'none'
  }
  return (
    <Alert className="my-2" variant="primary" style={style}>
      {notification.message}
    </Alert>
  )
}

export default Notification