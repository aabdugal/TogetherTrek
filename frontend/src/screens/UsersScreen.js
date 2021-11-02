import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { path } from '../constants/pathConstants'
import axios from 'axios'
import { Container, CardGroup, Button, Row, Col } from 'react-bootstrap'
import OtherUser from '../components/OtherUser'
import { AppContext } from '../context'
import { Redirect } from 'react-router-dom'
import { WAKEUP } from '../constants/actionConstants'
import Message from '../components/Message'

const UsersScreen = () => {
  const [users, setUsers] = useState([])
  const [show, setShow] = useState(true)
  const [user, setUser] = useState()
  const [success, setSuccess] = useState(false)
  const { userInfo, dispatchEvents } = useContext(AppContext)
  const history = useHistory()

  useEffect(() => {
    dispatchEvents(WAKEUP)
    axios.get(`${path}/users`).then((res) => {
      setUsers(res.data)
      console.log(res.data)
    })
    if (!userInfo) {
      history.push('/')
    }
  }, [])

  const removeEveryone = async (e) => {
    e.preventDefault()
    setShow(false)
    const { data } = await axios.delete(`${path}/users`)
  }

  return (
    <Container>
      <h2>Users:</h2>
      {success && <Message variant='success'>Profile Updated</Message>}
      {userInfo && userInfo.username == 'admin' && (
        <Button variant='primary' onClick={(e) => removeEveryone(e)}>
          Remove Everyone
        </Button>
      )}
      <Container fluid='true'>
        {show && (
          <CardGroup>
            {users && users.map((el) => <OtherUser friend={el} key={el.id} />)}
          </CardGroup>
        )}
      </Container>
    </Container>
  )
}
export default UsersScreen
