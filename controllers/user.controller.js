const { request, response } = require('express')
const User = require('../models/user.model')
const bcryptjs = require('bcryptjs')
const { userById } = require('../services/user.service')
const { mailer } = require('../config/mailer/node-mailer')

const getUsers = async (req = request, res = response) => {
  const {
    limit = 5,
    from = 0,
    role = ['MENTOR_ROLE', 'STUDENT_ROLE'],
    career,
    university,
    job,
    experience,
    nationality,
    genre,
  } = req.query
  const query = {
    role,
    career,
    university,
    job,
    experience,
    nationality,
    genre,
  }
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query),
    //* GET USERS WITH PAGINATED
    // User.find(query).skip(Number(from)).limit(Number(limit)),
  ])
  res.json({
    users,
    total,
  })
}

const getUser = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  res.json(user)
}

const postUsers = async (req, res = response) => {
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

const patchUsers = async (req, res = response) => {
  const { id } = req.params
  const { _id, password, email, ...rest } = req.body
  if (password) {
    const salt = bcryptjs.genSaltSync()
    rest.password = bcryptjs.hashSync(password, salt)
  }
  const options = {
    returnDocument: 'after',
  }
  const user = await User.findByIdAndUpdate(id, rest, options)
  res.json(user)
}

const generateOrder = async (req, res = response) => {
  console.log('ADD', req.body)

  const { mercadopago, mentor_id, reservedTimes, student_id } = req.body
  // date, hour, meet

  try {
    const user = await userById(student_id)
    const mentor = await userById(mentor_id)

    const resp = await mailer(
      {
        to: user.email,
        subject: 'Tienes una nueva reunión agendada.',
        template: 'student',
      },
      {
        name_student: user.name,
        name_mentor: mentor.name,
        linkedin_mentor: mentor.linkedin,
        duration: '30min',
        date: '15/03/2023',
        hour: '3:00PM',
        meet: 'https://meet.google.com/tfn-kvpr-fba',
      }
    )
    res.status(200).json({
      ...resp,
      ok: true,
      message: 'Correo enviado',
    })
  } catch (error) {
    console.log('erro', error);
    res.status(500).json({
      ok: false,
      message: 'algo fallo',
      error
    })
  }

  res.status(200).json({
    ok: true,
    req: req.body,
  })
}

module.exports = {
  getUsers,
  postUsers,
  patchUsers,
  getUser,
  generateOrder,
}
