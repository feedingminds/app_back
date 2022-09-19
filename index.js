const express = require('express')

const app = express()
const port = 4001

app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  })
})

app.listen(port, () => {
  console.clear()
  console.log(
    `Express server running in port ${port}, to stop server press Ctrl + C.
Local: http://localhost:${port}/`
  )
})
