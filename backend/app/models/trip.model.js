const sql = require('./db.js')

const Trip = function (trip) {
  this.city = trip.city
  this.country = trip.country
  this.start_date = trip.start_date
  this.end_date = trip.end_date
  this.budget = trip.budget
}

Trip.create = (newTrip, result) => {
  sql.query('INSERT INTO trips SET ?', newTrip, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    console.log('created trip: ', { newTrip })
    result(null, { newTrip })
  })
}

Trip.getAll = (result) => {
  sql.query('SELECT * FROM trips', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    console.log('trips: ', res)
    result(null, res)
  })
}

// User.findById = (username, result) => {
//   sql.query(`SELECT * FROM users WHERE username = ?`, username, (err, res) => {
//     if (err) {
//       console.log('error: ', err)
//       result(err, null)
//       return
//     }

//     if (res.length) {
//       console.log('found user: ', res[0])
//       result(null, res[0])
//       return
//     }

//     result({ kind: 'not_found' }, null)
//   })
// }

// User.updateById = (username, user, result) => {
//   sql.query(
//     'UPDATE users SET password = ?, first_name = ?, last_name = ?, birthday = ?, gender = ?, city = ?, country =? WHERE username = ?',
//     [
//       user.password,
//       user.first_name,
//       user.last_name,
//       user.birthday,
//       user.gender,
//       user.city,
//       user.country,
//       username,
//     ],
//     (err, res) => {
//       if (err) {
//         console.log('error: ', err)
//         result(null, err)
//         return
//       }

//       if (res.affectedRows == 0) {
//         result({ kind: 'not_found' }, null)
//         return
//       }

//       console.log('updated user: ', { username: username, ...user })
//       result(null, { username: username, ...user })
//     }
//   )
// }

// User.remove = (username, result) => {
//   sql.query('DELETE FROM users WHERE username = ?', username, (err, res) => {
//     if (err) {
//       console.log('error: ', err)
//       result(null, err)
//       return
//     }

//     if (res.affectedRows == 0) {
//       result({ kind: 'not_found' }, null)
//       return
//     }

//     console.log('deleted user with username: ', username)
//     result(null, res)
//   })
// }

// User.removeAll = (result) => {
//   sql.query('DELETE FROM users', (err, res) => {
//     if (err) {
//       console.log('error: ', err)
//       result(null, err)
//       return
//     }

//     console.log(`deleted ${res.affectedRows} users`)
//     result(null, res)
//   })
// }

module.exports = Trip
