import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { path } from '../constants/pathConstants'
import axios from 'axios'
import { Container, CardGroup, Button, Row, Col } from 'react-bootstrap'
import OtherUser from '../components/OtherUser'
import { AppContext } from '../context'
import { Redirect } from 'react-router-dom'
import Post from '../components/Post'
import { WAKEUP } from '../constants/actionConstants'
import Message from '../components/Message'
import { Link } from 'react-router-dom'

const PostsScreen = () => {
  const [posts, setPosts] = useState([])
  const [success, setSuccess] = useState(false)
  const [show, setShow] = useState(true)
  const { userInfo, dispatchEvents } = useContext(AppContext)
  const history = useHistory()

  useEffect(() => {
    dispatchEvents(WAKEUP)
    axios.get(`${path}/posts`).then((res) => {
      setPosts(res.data)
      console.log(res.data)
    })
    // if (!userInfo) {
    //   history.push('/')
    // }
  }, [])

  const removeAll = async (e) => {
    e.preventDefault()
    setShow(false)
    const { data } = await axios.delete(`${path}/posts`)
  }
  return (
    <Container>
      <h2>User Posts:</h2>
      <Row className='py-3'>
        <Col>
          Have an Account? <Link to='/query'>Query Posts</Link>
        </Col>
      </Row>
      {success && <Message variant='success'>Post Updated</Message>}
      {userInfo && userInfo.username == 'admin' && (
        <Button variant='primary' onClick={(e) => removeAll(e)}>
          Remove All Posts
        </Button>
      )}
      <Container fluid='true'>
        {show && (
          <CardGroup>
            {posts &&
              posts
                .filter(
                  (el) =>
                    el.author_id !== userInfo.username &&
                    el.author_id !== 'admin'
                )
                .map((el) => (
                  <Post
                    post={el}
                    key={el.id}
                    userInfo={userInfo}
                    setSuccess={setSuccess}
                  />
                ))}
          </CardGroup>
        )}
      </Container>
    </Container>
  )
}

export default PostsScreen
