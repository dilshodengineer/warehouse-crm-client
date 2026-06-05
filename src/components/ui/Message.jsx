import React from 'react'

const Message = ({ message, type }) => {
  return (
    <div className={`text-center py-2 text-${type}`}>{message}</div>
  )
}

export default Message