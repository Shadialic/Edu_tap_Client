import React from 'react'
import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:5473");
function Notification() {
  return (
    <div>Notification</div>
  )
}

export default Notification