import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { path } from '../constants/pathConstants'
import { AppContext } from '../context'
import axios from 'axios'
import { FRIEND_REQUEST } from '../constants/actionConstants'
import FriendRequest from '../components/FriendRequest'

const NotificationsScreen = () => {
  const { userInfo, dispatchEvents } = useContext(AppContext)
  const [friendRequests, setFriendRequests] = useState([])

  useEffect(async () => {
    console.log(userInfo.username)
    const { data } = await axios.put(`${path}/requests/${userInfo.username}`, {
      type: FRIEND_REQUEST,
    })
    console.log(data)
    setFriendRequests(data)
  }, [])

  return (
    <Container>
      <Row>
        <Col>
          <h2>Friend Requests</h2>
          {friendRequests &&
            friendRequests.map((el) => (
              <FriendRequest friend={el} key={el.username} />
            ))}
        </Col>
        <Col>
          <h2> Trip Requests</h2>
        </Col>
      </Row>
    </Container>
  )
}
export default NotificationsScreen
