const sql = require('./db.js')

const User = function (user) {
  this.username = user.username
  this.password = user.password
  this.first_name = user.first_name
  this.last_name = user.last_name
  this.birthday = user.birthday
  this.city = user.city
  this.country = user.country
  this.gender = user.gender
}

User.create = (newUser, result) => {
  sql.query('INSERT INTO users SET ?', newUser, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    console.log('created user: ', { newUser })
    result(null, { newUser })
  })
}

User.getAll = (result) => {
  sql.query('SELECT * FROM users', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    console.log('users: ', res)
    result(null, res)
  })
}

User.findById = (username, result) => {
  sql.query(`SELECT * FROM users WHERE username = ?`, username, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    if (res.length) {
      console.log('found user: ', res[0])
      result(null, res[0])
      return
    }

    result({ kind: 'not_found' }, null)
  })
}

User.updateById = (username, user, result) => {
  sql.query(
    'UPDATE users SET password = ?, first_name = ?, last_name = ?, birthday = ?, gender = ?, city = ?, country =? WHERE username = ?',
    [
      user.password,
      user.first_name,
      user.last_name,
      user.birthday,
      user.gender,
      user.city,
      user.country,
      username,
    ],
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return
      }

      if (res.affectedRows == 0) {
        result({ kind: 'not_found' }, null)
        return
      }

      console.log('updated user: ', { username: username, ...user })
      result(null, { username: username, ...user })
    }
  )
}

User.remove = (username, result) => {
  sql.query('DELETE FROM users WHERE username = ?', username, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null)
      return
    }

    console.log('deleted user with username: ', username)
    result(null, res)
  })
}

User.removeAll = (result) => {
  sql.query('DELETE FROM users', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    console.log(`deleted ${res.affectedRows} users`)
    result(null, res)
  })
}

module.exports = User
