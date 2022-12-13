const express = require('express')
const { check } = require('express-validator')
const { GetMailer, postMailer } = require('../controllers/mailer.controller')

const { validateFields } = require('../middlewares')

const router = express.Router()


router.get('/', GetMailer);

router.post(
  '/',
  [
    check('to', 'to is required'),
    check('subject', 'subject is required'),
    validateFields,
  ],
  postMailer
)

module.exports = router