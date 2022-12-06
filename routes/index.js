const { Router } = require('express')

const usersRouter = require('./users.route')
const mailerRouter = require('./mailer.route')
const authRouter = require('./auth.route')

function routes(app) {
  const router = Router()

  router.use('/users', usersRouter)
  router.use('/auth', authRouter)
  router.use('/mailer', mailerRouter)
  
  app.use('/api/v1', router)
}

module.exports = routes
