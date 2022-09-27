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

module.exports = {
  login,
}
