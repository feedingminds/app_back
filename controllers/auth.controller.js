const { response } = require('express')
const User = require('../models/user.model')
const bcryptjs = require('bcryptjs')

const login = async (req, res = response) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        message: "Email doesn't exists",
      })
    }

    const isValidPassword = bcryptjs.compareSync(password, user.password)
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Password isn't correct",
      })
    }
    res.json(user)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Contact with your developer',
    })
  }
}

const register = async (req, res = response) => {
  const { name, email, password, role } = req.body
  const user = new User({
    name,
    email,
    password,
    role,
  })

  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(password, salt)

  await user.save()

  res.status(201).json(user)
}

module.exports = {
  login,
  register,
}
