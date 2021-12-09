const Trip = require('../models/trip.model.js')
const sql = require('../models/db.js')

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  const trip = new Trip({
    city: req.body.city,
    country: req.body.country,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    budget: req.body.budget,
  })
  Trip.create(trip, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Post.',
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Trip.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving trips.',
      })
    else res.send(data)
  })
}

exports.addUser = (req, result) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  const newUser = {
    trip_id: req.params.trip_id,
    username: req.body.username,
  }

  sql.query(`INSERT INTO user_trips SET ?`, newUser, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result.status(500).send({
        message: err.message || 'Some error occurred while inserting user.',
      })
    } else {
      console.log('user successfully added')
      result.send(res)
    }
  })

  //   Post.updateById(req.params.post_id, post, (err, data) => {
  //     if (err) {
  //       if (err.kind === 'not_found') {
  //         res.status(404).send({
  //           message: `Not found post with post_id ${req.params.post_id}.`,
  //         })
  //       } else {
  //         res.status(500).send({
  //           message: 'Error updating Post with post_id ' + req.params.post_id,
  //         })
  //       }
  //     } else res.send(data)
  //   })
}

// exports.findUsers = (req, result) => {
//   sql.query(
//     `SELECT * FROM posts WHERE author_id = ?`,
//     [req.params.username],
//     (err, res) => {
//       console.log(req.params)
//       if (err) {
//         console.log('error: ', err)
//         result.status(500).send({
//           message: err.message || 'Some error occurred while retrieving posts.',
//         })
//       } else {
//         console.log('posts: ', res)
//         result.send(res)
//       }
//     }
//   )
// }

// exports.findOne = (req, res) => {
//   Post.findById(req.params.post_id, (err, data) => {
//     if (err) {
//       if (err.kind === 'not_found') {
//         res.status(404).send({
//           message: `Not found Post with post_id ${req.params.post_id}.`,
//         })
//       } else {
//         res.status(500).send({
//           message: 'Error retrieving Post with post_id ' + req.params.post_id,
//         })
//       }
//     } else res.send(data)
//   })
// }

// exports.update = (req, res) => {
//   if (!req.body) {
//     res.status(400).send({
//       message: 'Content can not be empty!',
//     })
//   }
//   const post = new Post({
//     title: req.body.title,
//     description: req.body.description,
//     country: req.body.country,
//     city: req.body.city,
//     post_date: req.body.post_date,
//   })

//   Post.updateById(req.params.post_id, post, (err, data) => {
//     if (err) {
//       if (err.kind === 'not_found') {
//         res.status(404).send({
//           message: `Not found post with post_id ${req.params.post_id}.`,
//         })
//       } else {
//         res.status(500).send({
//           message: 'Error updating Post with post_id ' + req.params.post_id,
//         })
//       }
//     } else res.send(data)
//   })
// }

// exports.delete = (req, res) => {
//   console.log(req.params.post_id)
//   Post.remove(req.params.post_id, (err, data) => {
//     if (err) {
//       if (err.kind === 'not_found') {
//         res.status(404).send({
//           message: `Not found Post with post_id ${req.params.post_id}.`,
//         })
//       } else {
//         res.status(500).send({
//           message: 'Could not delete Post with post_id ' + req.params.post_id,
//         })
//       }
//     } else res.send({ message: `Post was deleted successfully!` })
//   })
// }

// exports.deleteAll = (req, res) => {
//   Post.removeAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message: err.message || 'Some error occurred while removing all posts.',
//       })
//     else res.send({ message: `All posts were deleted successfully!` })
//   })
// }

// exports.query = (req, res) => {
//   query = req.body.query
//   type = req.body.type
//   Post.searchBy(type, query, (err, data) => {
//     if (err) {
//       if (err.kind === 'not_found') {
//         res.status(404).send({
//           message: `Not found post with query ${query}.`,
//         })
//       } else {
//         res.status(500).send({
//           message: 'Error retrieving query with ' + query,
//         })
//       }
//     } else res.send(data)
//   })
// }
