const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ message: 'Hello world' })
})

require('./app/routes/user.routes.js')(app)
require('./app/routes/post.routes.js')(app)
require('./app/routes/requests.routes.js')(app)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
