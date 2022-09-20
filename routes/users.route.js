const express = require('express')
const User = require('../models/user.model')

const router = express.Router()

router.get('/', async (req, res) => {
  const users = await User.find()
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  res.json(user)
})

router.post('/', async (req, res) => {
  const body = req.body
  const user = await User.create(body)
  res.status(201).json(user)
})

router.patch('/:id', async (req, res) => {
  res.json({ message: 'PATCH' })
})

router.delete('/:id', async (req, res) => {
  res.status(201).json({ message: 'DELETE' })
})

module.exports = router
