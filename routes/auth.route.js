const express = require('express')
const { check } = require('express-validator')
const { login } = require('../controllers/auth.controller')

const { validateFields } = require('../middlewares')

const router = express.Router()

router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields,
  ],
  login
)

module.exports = router
