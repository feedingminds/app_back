const express = require('express')
const { check } = require('express-validator')
const { sendMail } = require('../controllers/mailer.controller')

const { validateFields } = require('../middlewares')

const router = express.Router()

router.post(
  '/mailer',
  [
    check('to', 'to is required'),
    check('subject', 'subject is required'),
    validateFields,
  ],
  sendMail
)

module.exports = router