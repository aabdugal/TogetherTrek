import '../index.css'
import React, { useEffect, useState } from 'react'
import {
  Card,
  ListGroup,
  Button,
  Container,
  Row,
  Col,
  Form,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { path } from '../constants/pathConstants'
import axios from 'axios'
const Post = ({ post, userInfo, setSuccess }) => {
  const [show, setShow] = useState(true)
  const [edit, setEdit] = useState(false)

  const [title, setTitle] = useState(post.title)
  const [desc, setDesc] = useState(post.description)

  const removeHandler = async (e) => {
    e.preventDefault()
    setShow(!show)
    const { data } = await axios.delete(`${path}/posts/${post.post_id}`)
    setSuccess(true)
    setTimeout((e) => setSuccess(false), 1600)
    console.log(data)
  }

  const updateHandler = async (e) => {
    e.preventDefault()
    setSuccess(true)
    setTimeout((e) => setSuccess(false), 1600)
    const newPost = {
      title: title,
      author_id: post.author_id,
      description: desc,
      country: post.country,
      city: post.city,
      post_date: Date().toLocaleString(),
    }
    console.log(newPost)
    console.log(post)
    const { data } = await axios.put(`${path}/posts/${post.post_id}`, newPost)
    console.log(data)
    setEdit(!edit)

    // setShow(!show)
  }
  const editHandler = async (e) => {
    e.preventDefault()
    setEdit(!edit)
  }
  return (
    <>
      {show && (
        <>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              {!edit ? (
                <>
                  <Card.Title>{title}</Card.Title>
                  <Card.Subtitle className='mb-2 text-muted'>
                    {post.author_id}
                  </Card.Subtitle>
                  <Card.Text>{desc}</Card.Text>
                  <Card.Text>
                    To {post.city}, {post.country}
                  </Card.Text>
                  <Container>
                    {post.author_id !== userInfo.username && (
                      <Row>
                        <Col>
                          <Link to={`/profile/${post.author_id}`}>
                            Author's Profile
                          </Link>
                        </Col>
                      </Row>
                    )}
                  </Container>
                </>
              ) : (
                <>
                  <Form>
                    <Form.Group controlId='text'>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        as='textarea'
                        rows={2}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='text'>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type='text'
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        as='textarea'
                        rows={5}
                      ></Form.Control>
                    </Form.Group>
                  </Form>
                </>
              )}

              {userInfo &&
                (userInfo.username === 'admin' ||
                  userInfo.username === post.author_id) && (
                  <>
                    {!edit ? (
                      <Button variant='primary' onClick={editHandler}>
                        Edit
                      </Button>
                    ) : (
                      <Button variant='primary' onClick={editHandler}>
                        Close
                      </Button>
                    )}

                    {!edit ? (
                      <Button variant='primary' onClick={removeHandler}>
                        Remove
                      </Button>
                    ) : (
                      <Button variant='primary' onClick={updateHandler}>
                        Update
                      </Button>
                    )}
                  </>
                )}
            </Card.Body>
            {!edit && (
              <Card.Footer>
                <small className='text-muted'>{post.post_date}</small>
              </Card.Footer>
            )}
          </Card>
        </>
      )}
    </>
  )
}

export default Post
