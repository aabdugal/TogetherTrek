module.exports = (app) => {
  const requests = require('../controllers/requests.controller.js')

  app.put('/requestFriend/:username', requests.requestFriend)

  app.put('/requests/rejectRequest/:username', requests.rejectRequest)
  app.put('/requests/acceptRequest/:username', requests.acceptRequest)
  app.put('/requests/:username', requests.getRequests)

  app.put('/requests/messages/:username', requests.getMessages)
  app.post('/requests/messages/', requests.addMessage)
}
