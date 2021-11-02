const sql = require('../models/db.js')
const Request = require('../models/request.model.js')

exports.requestFriend = (req, result) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }
  console.log(req.body.author_id, req.params.username, req.body.type)
  const newNotification = {
    author_id: req.body.author_id,
    recipient_id: req.params.username,
    type: req.body.type,
  }
  sql.query('INSERT INTO notifications SET ?', newNotification, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving notifications.',
      })
      return
    }
    console.log('created notification: ', newNotification)
    result.send({ message: `Friend was requested successfully!` })
  })
}

exports.getRequests = (req, result) => {
  sql.query(
    'SELECT * FROM notifications a INNER JOIN users b ON a.author_id = b.username WHERE a.recipient_id = ? AND a.type = ?',
    [req.params.username, req.body.type],
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result.status(500).send({
          message:
            err.message ||
            'Some error occurred while retrieving notifications.',
        })
        return
      }
      console.log(res)
      result.send(res)
    }
  )
}

exports.rejectRequest = (req, result) => {
  const newReq = new Request({
    author_id: req.params.username,
    recipient_id: req.body.recipient_id,
    type: req.body.type,
  })
  Request.removeRequest(newReq, (err, data) => {
    if (err) {
      result.status(500).send({
        message: 'Error updating username with username ' + req.params.username,
      })
    } else {
      result.send({ message: `Friend was rejected successfully!` })
    }
  })
}

exports.acceptRequest = (req, result) => {
  const newReq = new Request({
    author_id: req.params.username,
    recipient_id: req.body.recipient_id,
    type: req.body.type,
  })
  Request.removeRequest(newReq, (err, data) => {
    console.log('accept1: remove user')
  })
  user1 = req.params.username
  user2 = req.body.recipient_id

  if (user1.localeCompare(user2) > 0) {
    ;[user1, user2] = [user2, user1]
  }
  sql.query(
    'INSERT INTO friends SET ? ',
    { user1: user1, user2: user2 },
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result.status(500).send({
          message:
            err.message ||
            'Some error occurred while retrieving notifications.',
        })
        return
      }
      console.log('created friends: ')
      result.send({ message: `Friends was created successfully!` })
    }
  )
}

exports.getMessages = (req, result) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  console.log(req.body.author_id, req.params.username)
  sql.query(
    `SELECT * FROM messages WHERE author_id = ? and recipient_id = ?
  UNION
  SELECT * FROM messages WHERE author_id = ? and recipient_id = ?
  ORDER BY msg_id`,
    [
      req.body.author_id,
      req.params.username,
      req.params.username,
      req.body.author_id,
    ],
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result.status(500).send({
          message:
            err.message || 'Some error occurred while receiveng messages.',
        })
        return
      }
      console.log('created notification: ', res)
      result.send(res)
    }
  )
}

exports.addMessage = (req, result) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }
  const newMessage = {
    author_id: req.body.author_id,
    recipient_id: req.body.recipient_id,
    data: req.body.data,
    send_date: req.body.send_date,
  }
  sql.query('INSERT INTO messages SET ? ', newMessage, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving notifications.',
      })
      return
    }
    console.log('created friends: ')
    result.send({ message: `Friends was created successfully!` })
  })
}
