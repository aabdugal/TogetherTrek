import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FRIEND_REQUEST } from '../constants/actionConstants'
import { path } from '../constants/pathConstants'
const FriendRequest = ({ friend }) => {
  const [show, setShow] = useState(true)
  const [message, setMessage] = useState('')
  const acceptHandler = async (e) => {
    e.preventDefault()
    setShow(false)
    const { data } = await axios.put(
      `${path}/requests/acceptRequest/${friend.username}`,
      { recipient_id: friend.recipient_id, type: FRIEND_REQUEST }
    )
    console.log(data)
  }
  let profilePic =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  const rejectHandler = async (e) => {
    e.preventDefault()
    setShow(false)
    const { data } = await axios.put(
      `${path}/requests/rejectRequest/${friend.username}`,
      { recipient_id: friend.recipient_id, type: FRIEND_REQUEST }
    )
    console.log(data)
  }

  return (
    <>
      {show && (
        <Card className='friend-card' style={{ width: '18rem' }}>
          <Card.Img variant='top' src={profilePic} />
          <Card.Body>
            <Card.Title>{friend.username}</Card.Title>
            <Card.Text>
              {friend.first_name} {friend.last_name}
            </Card.Text>
            <Card.Text>
              {friend.city}, {friend.country}{' '}
            </Card.Text>
            <Card.Text> {friend.gender} </Card.Text>
            <Row>
              <Col className='half-col'>
                <Button variant='primary' onClick={(e) => acceptHandler(e)}>
                  Accept
                </Button>
              </Col>
              <Col>
                <Button variant='primary' onClick={(e) => rejectHandler(e)}>
                  Reject
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </>
  )
}

export default FriendRequest
