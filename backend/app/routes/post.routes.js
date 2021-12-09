module.exports = (app) => {
  const posts = require('../controllers/post.controller.js')
  app.post('/posts', posts.create)

  app.get('/posts', posts.findAll)

  app.get('/posts/user/:username', posts.findUsers)

  app.get('/posts/:post_id', posts.findOne)

  app.put('/posts', posts.query)

  app.get('/info', posts.info)

  app.put('/posts/:post_id', posts.update)

  app.delete('/posts/:post_id', posts.delete)

  app.delete('/posts', posts.deleteAll)
}
