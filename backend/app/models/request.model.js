const sql = require('./db.js')

const Request = function (req) {
  this.author_id = req.author_id
  this.recipient_id = req.recipient_id
  this.type = req.type
}

Request.removeRequest = (request, result) => {
  sql.query(
    'DELETE FROM notifications WHERE author_id = ? AND recipient_id = ? AND type = ?',
    [request.author_id, request.recipient_id, request.type],
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return
      }
      console.log('deleted notification: ', res)
      result(null, err)
    }
  )
}

module.exports = Request
