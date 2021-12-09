import React, { useState, useEffect } from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button, Row, Col, Container, CardGroup } from 'react-bootstrap'
import Post from '../components/Post'
import axios from 'axios'
import { path } from '../constants/pathConstants'
const QueryScreen = () => {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('title')
  const [posts, setPosts] = useState([])
  const [userInfo, setUserInfo] = useState()
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(100000)
  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('userInfo'))
    setUserInfo(userStorage)
    console.log(userStorage)
    // const { data } = await axios.get(`${path}/users/${id}`)
    // setProfileInfo(data)
  }, [])
  //   const [query, setQuery] = useState('')
  const submitHandler = async (e) => {
    e.preventDefault()

    console.log(query, type)
    const { data } = await axios.put(`${path}/posts`, {
      query: query,
      type: type,
    })
    console.log(data)
    setPosts(data)
  }

  const submitBudget = async (e) => {
    e.preventDefault()

    const { data } = await axios.put(`${path}/posts`, {
      query: `${from};${to}`,
      type: 'budget',
    })
    console.log(data)
    setPosts(data)
  }

  return (
    <>
      <FormContainer>
        <h1>Enter Query:</h1>
        <h3>Search by Values:</h3>
        <Form onSubmit={submitHandler}>
          <Row>
            <Col>
              <Form.Group controlId='query'>
                <Form.Control
                  type='title'
                  placeholder='Enter Query'
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                  }}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='exampleForm.ControlSelect1'>
                <Form.Control
                  as='select'
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>title</option>
                  <option>country</option>
                  <option>city</option>
                  <option>author_id</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Button type='submit' variant='primary'>
            Request
          </Button>
        </Form>
        <h3>Search in budget range:</h3>
        <Form onSubmit={submitBudget}>
          <Row>
            <Col>
              <Form.Group controlId='query'>
                <Form.Control
                  type='title'
                  placeholder='from value'
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value)
                  }}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='query'>
                <Form.Control
                  type='title'
                  placeholder='to value'
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value)
                  }}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Button type='submit' variant='primary'>
            Request Budget
          </Button>
        </Form>
      </FormContainer>

      <Container fluid='true'>
        <CardGroup>
          {posts &&
            posts.map((el) => (
              <Post post={el} key={el.id} userInfo={userInfo} />
            ))}
        </CardGroup>
      </Container>
    </>
  )
}

export default QueryScreen
