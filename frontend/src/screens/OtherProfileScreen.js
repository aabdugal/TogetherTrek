import '../index.css'
import React, { useState, useEffect, useContext } from 'react'
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import Post from '../components/Post'
import Message from '../components/Message'
import { AppContext } from '../context'
import { path } from '../constants/pathConstants'
import { FRIEND_REQUEST } from '../constants/actionConstants'

const OtherProfileScreen = ({ location, history, useParams }) => {
  //   const { userInfo, dispatchEvents } = useContext(AppContext)
  const [userInfo, setUserInfo] = useState()
  const [profileInfo, setProfileInfo] = useState()
  const [message, setMessage] = useState()
  const { pathname } = useLocation()
  const id = pathname.split('/')[2]
  let profilePic =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  const friendButtonHandler = async (e) => {
    e.preventDefault()
    const { data } = await axios.put(`${path}/requestFriend/${id}`, {
      author_id: userInfo.username,
      type: FRIEND_REQUEST,
    })
    console.log(data)
    setMessage(data.message)
    setTimeout(() => {
      setMessage()
    }, 1600)
  }
  const blockButtonHandler = async (e) => {
    e.preventDefault()
    // console.log('youre tryint to block, not yet implemented')
  }

  const unblockButtonHandler = async (e) => {
    e.preventDefault()
  }
  const messageButtonHandler = (e) => {
    console.log('Not yet implemented')
  }

  useEffect(async () => {
    const userStorage = JSON.parse(localStorage.getItem('userInfo'))
    setUserInfo(userStorage)
    const { data } = await axios.get(`${path}/users/${id}`)
    setProfileInfo(data)
    console.log(data)
  }, [])

  return (
    <>
      {message && <Message variant='success'>{message}</Message>}
      {profileInfo && (
        <Row>
          <Col md={3}>
            <h2>User Profile</h2>
            <img src={profilePic} alt='profile pic' width='100' height='100' />
            <div>Username: {profileInfo.username}</div>
            <div>First Name: {profileInfo.first_name}</div>
            <div>Last Name: {profileInfo.last_name}</div>
            <div>Birthday: {profileInfo.birthdate}</div>
            <div>Gender: {profileInfo.gender}</div>
            <div>City: {profileInfo.city}</div>
            <div>Country: {profileInfo.country}</div>
            <Button
              variant='primary'
              className='half-button'
              onClick={(e) => friendButtonHandler(e)}
            >
              Add Friend
            </Button>
            <Button
              variant='primary'
              className='half-button'
              onClick={(e) => messageButtonHandler(e)}
            >
              Message
            </Button>
          </Col>
          {/* <Col md={3}>
            <h2>User Posts</h2>
          </Col>
          <Col md={3}>
            <h2>User Trips</h2>
          </Col> */}
        </Row>
      )}
    </>
  )
}

export default OtherProfileScreen
