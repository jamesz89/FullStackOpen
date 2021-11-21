import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const style = {
    width: '600px',
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification.visibility ? '' : 'none'
  }
  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification