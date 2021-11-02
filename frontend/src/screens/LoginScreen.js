import '../index.css'
import React, { useState, useEffect, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'
import { path } from '../constants/pathConstants'
import { AppContext } from '../context'
import { USER_LOGIN, USER_LOGOUT } from '../constants/actionConstants'

const LoginScreen = ({ history, location }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { dispatchEvents } = useContext(AppContext)
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const submitHandler = async (e) => {
    e.preventDefault()
    setError()
    if (password === '' || username === '') {
      setError("Password or Username can't be empty!")
      return
    }
    try {
      const { data } = await axios.post(`${path}/login`, {
        username: username,
        password: password,
      })
      console.log(data)
      dispatchEvents(USER_LOGIN, { username: username, password: password })
      history.push('/')
    } catch (error) {
      setError('Wrong password')
    }
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Button type='submit' variant='primary' onClick={submitHandler}>
        Sign In
      </Button>
      <Row className='py-3'>
        <Col>
          New User?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
