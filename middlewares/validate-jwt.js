const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/user.model')

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(401).json({
      message: 'Token not found',
    })
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY)
    const user = await User.findById(uid)

    if (!user) {
      return res.status(401).json({
        message: "User doesn't exists",
      })
    }

    //TODO: verify user status in true
    if (!user.status) {
      return res.status(401).json({
        message: "User doesn't exists",
      })
    }
    req.user = user
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({
      message: 'Token is not valid',
    })
  }
}

module.exports = {
  validateJWT,
}
