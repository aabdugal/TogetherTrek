const sql = require('./db.js')

const Post = function (post) {
  this.title = post.title
  this.author_id = post.author_id
  this.description = post.description
  this.country = post.country
  this.city = post.city
  this.post_date = post.post_date
}

Post.create = (newPost, result) => {
  sql.query('INSERT INTO posts SET ?', newPost, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    console.log('created post: ', { newPost })
    result(null, { newPost })
  })
}

Post.getAll = (result) => {
  sql.query('SELECT * FROM posts', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    console.log('posts: ', res)
    result(null, res)
  })
}

Post.findById = (post_id, result) => {
  sql.query(`SELECT * from posts WHERE post_id = ${post_id}`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    if (res.length) {
      console.log('found post: ', res[0])
      result(null, res[0])
      return
    }

    result({ kind: 'not_found' }, null)
  })
}

Post.updateById = (post_id, post, result) => {
  sql.query(
    'UPDATE posts SET title = ?, description = ?, country = ?, city = ?, post_date = ? WHERE post_id = ?',
    [
      post.title,
      post.description,
      post.country,
      post.city,
      post.post_date,
      post_id,
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

      console.log('updated post: ', { post_id: post_id, ...post })
      result(null, { post_id: post_id, ...post })
    }
  )
}

Post.remove = (post_id, result) => {
  sql.query('DELETE FROM posts WHERE post_id = ?', post_id, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null)
      return
    }

    console.log('deleted post with post_id: ', post_id)
    result(null, res)
  })
}

Post.removeAll = (result) => {
  sql.query('DELETE FROM posts', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    console.log(`deleted ${res.affectedRows} posts`)
    result(null, res)
  })
}

module.exports = Post
