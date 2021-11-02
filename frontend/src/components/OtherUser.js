import '../index.css'
import React, { useState, useEffect, useContext, useHistory } from 'react'
import { Card, Col, Container, Row, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { path } from '../constants/pathConstants'
import axios from 'axios'
import { AppContext } from '../context'

const OtherUser = ({ friend, isAFriend }) => {
  const [show, setShow] = useState(true)
  const [edit, setEdit] = useState(false)
  const [firstName, setFirstName] = useState(friend.first_name)
  const [lastName, setLastName] = useState(friend.last_name)
  const [city, setCity] = useState(friend.city)
  const [country, setCountry] = useState(friend.country)
  const [gender, setGender] = useState(friend.gender)
  const [birthdate, setBirthdate] = useState(friend.birthdate)
  const { userInfo } = useContext(AppContext)

  let profilePic =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

  const messageFriend = (e) => {
    console.log('Not implemented')
  }

  const deleteHandler = async (e) => {
    e.preventDefault()
    console.log(friend.username)
    const { data } = await axios.delete(`${path}/users/${friend.username}`)
    setShow(false)
  }

  const deleteFriendHandler = async (e) => {
    e.preventDefault()
    // setShow(false)
    const { data } = await axios.put(
      `${path}/user-friends/delete/${friend.username}`,
      { friend_id: userInfo.username }
    )
    // user-friends/delete/aorak
    console.log(friend.username, { friend_id: userInfo.username })
    console.log(data)
  }

  const updateHandler = async (e) => {
    e.preventDefault()
  }

  const editHandler = (e) => {
    e.preventDefault()
    setShow(!show)
    setEdit(!edit)
  }
  console.log(userInfo.username)
  console.log(userInfo)
  return (
    <div>
      {show && friend.username !== 'admin' && (
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
            {userInfo && userInfo.username === 'admin' && (
              <Row>
                <Col className='half-col'>
                  <Button variant='primary' onClick={(e) => deleteHandler(e)}>
                    Remove
                  </Button>
                </Col>
                <Col>
                  <Button variant='primary' onClick={(e) => editHandler(e)}>
                    Edit
                  </Button>
                </Col>
              </Row>
            )}
            {isAFriend && (
              <Row>
                <Col className='half-col'>
                  <Link to={`/messages/${friend.username}`}>
                    <Button variant='primary'>Message</Button>
                  </Link>
                </Col>
                <Col>
                  <Button
                    variant='primary'
                    onClick={(e) => deleteFriendHandler(e)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>
      )}
      {edit && (
        <Form onSubmit={updateHandler} style={{ width: '18rem' }}>
          <Form.Group controlId='text'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='exampleForm.ControlTextarea1'>
            <Form.Label>LastName</Form.Label>
            <Form.Control
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='exampleForm.ControlTextarea1'>
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='exampleForm.ControlTextarea1'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='exampleForm.ControlSelect1'>
            <Form.Label>Example select</Form.Label>
            <Form.Control
              as='select'
              onChange={(e) => setGender(e.target.value)}
            >
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
              <option>Prefer Not to Say</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='date'>
            <Form.Label>Enter Birth Date</Form.Label>
            <Form.Control
              type='date'
              placeholder='Enter Last Name'
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Container>
            <Row>
              <Col>
                <Button
                  variant='primary'
                  onClick={(e) => {
                    updateHandler(e)
                  }}
                >
                  Update
                </Button>
              </Col>
              <Col>
                <Button variant='primary' onClick={editHandler}>
                  Back
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </div>
  )
}

export default OtherUser
