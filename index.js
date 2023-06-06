const express = require('express')
const { connect } = require('./db/mongoose')
const routes = require('./routes')
const cors = require('cors')

;(async () => {
  const app = express()
  const port = process.env.PORT
  app.use(express.json())
  app.use(cors())
  await connect()

  routes(app)

  app.get('/', (req, res) => {
    res.json({
      message: `Hello World from ${process.env.NODE_ENV}!`,
    })
  })

  app.listen(port, () => {
    // console.clear()
    console.log(
      `Express server running in port ${port}, to stop server press Ctrl + C.
  Local: http://localhost:${port}/`
    )
  })
})()
