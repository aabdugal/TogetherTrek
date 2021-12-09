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
const Trip = ({ trip }) => {
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>
            to {trip.city}, {trip.country}
          </Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            post.author_id
          </Card.Subtitle>
          <Card.Text>desc</Card.Text>
          <Card.Text>To post.city, post.country</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className='text-muted'></small>
        </Card.Footer>
      </Card>
    </>
  )
}

export default Trip
