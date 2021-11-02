import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Card,
  CardGroup,
} from 'react-bootstrap'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { AppContext } from '../context'
import { path } from '../constants/pathConstants'
import Message from '../components/Message'
import { WAKEUP } from '../constants/actionConstants'
import Post from '../components/Post'

const ProfileScreen = () => {
  const { userInfo, dispatchEvents } = useContext(AppContext)
  const [posts, setPosts] = useState([])
  const [firstName, setFirstName] = useState(userInfo.first_name)
  const [lastName, setLastName] = useState(userInfo.last_name)
  const [password, setPassword] = useState(userInfo.password)
  const [confirmPassword, setConfirmPassword] = useState(userInfo.password)
  const [message, setMessage] = useState(null)
  const [gender, setGender] = useState(userInfo.gender)
  const [birthdate, setBirthdate] = useState(userInfo.birthdate)
  const [city, setCity] = useState(userInfo.city)
  const [country, setCountry] = useState(userInfo.country)
  const [edit, setEdit] = useState(false)
  const [success, setSuccess] = useState(false)
  const history = useHistory()

  let profilePic =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

  const editHandler = (e) => {
    e.preventDefault()
    setEdit(!edit)
  }

  useEffect(() => {
    axios.get(`${path}/posts/user/${userInfo.username}`).then((res) => {
      setPosts(res.data)
      console.log(res.data)
    })
  }, [])

  const updateHandler = async (e) => {
    e.preventDefault()
    setEdit(!edit)
    setSuccess(true)
    setTimeout((e) => setSuccess(false), 1600)

    const updatedUser = {
      username: userInfo.username,
      password: password,
      first_name: firstName,
      last_name: lastName,
      birthday: birthdate,
      gender: gender,
      city: city,
      country: country,
    }

    const { data } = await axios.put(
      `${path}/users/${userInfo.username}`,
      updatedUser
    )
  }
  console.log(edit)
  return (
    <>
      {success && <Message variant='success'>Profile Updated</Message>}
      {userInfo && (
        <Row>
          {!edit ? (
            <Col md={3}>
              <h2>User Profile</h2>
              <img
                src={profilePic}
                alt='profile pic'
                width='100'
                height='100'
              />

              <div>Username: {userInfo.username}</div>
              <div>First Name: {userInfo.first_name}</div>
              <div>Last Name: {userInfo.last_name}</div>
              <div>Birthday: {userInfo.birthdate}</div>
              <div>Gender: {userInfo.gender}</div>

              <div>City: {userInfo.city}</div>
              <div>Country: {userInfo.country}</div>
              <Button onClick={editHandler}>Edit</Button>
            </Col>
          ) : (
            <Col md={3}>
              <h2>Edit User Profile</h2>
              <img
                src={profilePic}
                alt='profile pic'
                width='100'
                height='100'
              />

              <Form onSubmit={updateHandler}>
                <div>Username: {userInfo.username}</div>
                <Form.Group controlId='name'>
                  <Form.Label>Enter First Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter First Name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='name'>
                  <Form.Label>Enter Last Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter Last Name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Form>
              <Form.Group controlId='exampleForm.ControlSelect1'>
                <Form.Label>Select Gender</Form.Label>
                <Form.Control
                  as='select'
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
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

              <Form.Group controlId='city'>
                <Form.Label>Enter City</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter City'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='country'>
                <Form.Label>Enter Country</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter Country'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='confirmPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Col>
                <Button onClick={updateHandler}>Update</Button>
                <Button onClick={editHandler}>Edit</Button>
              </Col>
            </Col>
          )}

          <Col md={3}>
            <h2>My Posts</h2>
            <CardGroup>
              {posts &&
                posts.map((el) => (
                  <Post
                    post={el}
                    key={el.id}
                    userInfo={userInfo}
                    setSuccess={setSuccess}
                  />
                ))}
            </CardGroup>
          </Col>

          <Col md={3}>
            <h2>My Trips</h2>
            {/* <Container>
                  {myTrips &&
                    myTrips.map((el) =>
                      el === undefined ? (
                        <></>
                      ) : (
                        <Trip
                          trip={el}
                          userId={userInfo._id}
                          profileView={true}
                          key={el._id}
                        />
                      )
                    )}
                </Container> */}
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProfileScreen
