const express = require('express')
const { storeQuestion, getQuestions } = require('../controllers/question.controller')

const router = express.Router()

router.get('/', getQuestions)

router.post('/', [], storeQuestion)

module.exports = router
