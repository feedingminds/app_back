const { Router } = require('express')

const usersRouter = require('./users.route')
const authRouter = require('./auth.route')

function routes(app) {
  const router = Router()

  router.use('/users', usersRouter)
  router.use('/auth', authRouter)
  app.use('/api/v1', router)
}

module.exports = routes
