import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import MessageList from './MessageList'
import { path } from '../constants/pathConstants'
import { AppContext } from '../context'
import { Container } from 'react-bootstrap'
const MessageBoard = () => {
  const [messages, setMessages] = useState([])
  const { userInfo, dispatchEvents } = useContext(AppContext)
  const [newMessage, setNewMessage] = useState('')
  // const [userInfo, setUserInfo]
  const { pathname } = useLocation()
  const id = pathname.split('/')[2]

  useEffect(async () => {
    // const userStorage = JSON.parse(localStorage.getItem('userInfo'))
    // setUserInfo(userStorage)
    const { data } = await axios.put(`${path}/requests/messages/${id}`, {
      author_id: userInfo.username,
    })
    setMessages(data)
    console.log(data)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newMsg = {
      author_id: userInfo.username,
      recipient_id: id,
      data: newMessage,
      send_date: Date().toLocaleString(),
    }
    const { data } = await axios.post(`${path}/requests/messages`, newMsg)
    console.log(data)
    setMessages(messages.concat(newMsg))
    setNewMessage('')
  }
  return (
    <Container>
      <div className='message-board'>
        <MessageList messages={messages} userId={userInfo.username} />
        <form onSubmit={handleSubmit} className='send-message-form'>
          <input
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            placeholder='Type your message and hit ENTER'
            type='text'
          />
        </form>
      </div>
    </Container>
  )
}

export default MessageBoard
