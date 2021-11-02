import '../index.css'
import React, { useState, useEffect, useContext } from 'react'
import {
  Button,
  Card,
  CardGroup,
  Col,
  Container,
  ListGroup,
  Row,
} from 'react-bootstrap'
import { AppContext } from '../context'
import Friend from '../components/Friend'
import axios from 'axios'
import { path } from '../constants/pathConstants'
import OtherUser from '../components/OtherUser'
const FriendsScreen = () => {
  const { userInfo, dispatchEvents } = useContext(AppContext)
  const [friends, setFriends] = useState([])
  const [show, setShow] = useState(false)

  useEffect(async () => {
    const { data } = await axios.get(
      `${path}/user-friends/${userInfo.username}`
    )
    setFriends(data)
  }, [])
  return (
    <Container>
      <h2>Friends:</h2>
      <CardGroup>
        {friends &&
          friends.map((el) => <OtherUser friend={el} isAFriend={true} />)}
      </CardGroup>
    </Container>
  )
}

export default FriendsScreen
