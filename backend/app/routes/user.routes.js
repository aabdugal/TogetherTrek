module.exports = (app) => {
  const users = require('../controllers/user.controller.js')
  app.post('/users', users.create)

  app.get('/users', users.findAll)

  app.get('/user-friends/:username', users.getFriends)

  app.get('/users/:username', users.findOne)

  app.put('/users/:username', users.update)

  app.put('/user-friends/delete/:username', users.deleteFriend)

  app.delete('/users/:username', users.delete)

  app.delete('/users', users.deleteAll)

  app.post('/login', users.login)
}
