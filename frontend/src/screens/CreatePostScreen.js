import React, { useState, useEffect, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import Message from '../components/Message'
import { path } from '../constants/pathConstants'
import { AppContext } from '../context'

const CreatePostScreen = ({ history }) => {
  const { userInfo, dispatchEvents } = useContext(AppContext)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [message, setMessage] = useState('')
  const [budget, setBudget] = useState('')

  const postHandler = async (e) => {
    e.preventDefault()
    try {
      const newPost = {
        title: title,
        author_id: userInfo.username,
        description: description,
        post_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        country: country,
        budget: parseInt(budget),
        city: city,
      }
      console.log(new Date().toISOString().slice(0, 19).replace('T', ' '))
      const { data } = await axios.post(`${path}/posts`, newPost)
      setMessage('Post Added')
      console.log(data)
      history.push('/')
    } catch {}
  }

  return (
    <>
      {message && <Message variant='success'>{message}</Message>}
      <Form>
        <Form.Group controlId='text'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='exampleForm.ControlTextarea1'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={10}
            placeholder='Enter Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='exampleForm.ControlTextarea1'>
          <Form.Label>Budget</Form.Label>
          <Form.Control
            type='nums'
            placeholder='Enter Budget'
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='text'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='text'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          variant='primary'
          onClick={(e) => {
            postHandler(e)
          }}
        >
          Post
        </Button>
      </Form>
    </>
  )
}

export default CreatePostScreen
