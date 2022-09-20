const { Router } = require('express')

const usersRouter = require('./users.route')

function routes(app) {
  const router = Router()

  router.use('/users', usersRouter)

  app.use('/api/v1', router)
}

module.exports = routes
