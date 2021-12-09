module.exports = (app) => {
  const trips = require('../controllers/trips.controller.js')
  app.post('/trips', trips.create)

  app.get('/trips', trips.findAll)

  app.get('/trips/user/:username', trips.friendTrips)

  app.put('/trips/:trip_id', trips.addUser)
}
