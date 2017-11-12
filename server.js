const cors = require('cors')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const handlers = require('./handlers')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "/public")))

handlers(app)

const port = process.env.PORT || 8008
app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test'){
    //eslint-disable-next-line no-console
    console.log("Server running on port " + port);
  }
})
