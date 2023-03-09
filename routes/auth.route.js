const express = require('express')
const { check } = require('express-validator')
const { login, register, refreshToken } = require('../controllers/auth.controller')
const { existsEmail } = require('../helpers/db-validators')


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
router.post(
  '/register',
  [
    check('name', 'Name is required'),
    check('password', 'Password must have more than six letters').isLength({
      min: 6,
    }),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(existsEmail),
    validateFields,
  ],
  register
)

router.post(
  "/refresh-token",
   refreshToken
)


module.exports = router
