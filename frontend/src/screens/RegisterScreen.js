import '../index.css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { path } from '../constants/pathConstants'

const RegisterScreen = ({ location, history }) => {
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [gender, setGender] = useState('Male')
  const [birthdate, setBirthdate] = useState(new Date())
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [message, setMessage] = useState(null)
  const [variant, setVariant] = useState('danger')
    
  const submitHandler = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      const newUser = {
        username: username,
        password: password,
        birthdate: birthdate,
        gender: gender,
        first_name: firstName,
        last_name: lastName,
        city: city,
        country: country,
      }
      const { data } = await axios.post(`${path}/users`, newUser)
      setVariant('success')
      setMessage('Success!')
      console.log(data)
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant={variant}>{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

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

        <Form.Group controlId='exampleForm.ControlSelect1'>
          <Form.Label>Example select</Form.Label>
          <Form.Control as='select' onChange={(e) => setGender(e.target.value)}>
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

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>
    </FormContainer>
  )
}

export default RegisterScreen
