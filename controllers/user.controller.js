const { request, response } = require('express')
const User = require('../models/user.model')
const bcryptjs = require('bcryptjs')
const { userById } = require('../services/user.service')
const { mailer } = require('../config/mailer/node-mailer')

const { generateJWT, generateRefreshToken } = require('../helpers/generateJWT')
var MercadoPago = require('mercadopago')
MercadoPago.configurations.setAccessToken(
  'TEST-2834539979791973-011021-6f64cbc13cb94e23013692fc436ef262-1111590115'
)

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

  const token = generateJWT(user.id, process.env.JWT_KEY)
  const refreshToken = generateRefreshToken(
    user.id,
    process.env.JWT_KEY_REFRESH
  )

  res.status(201).json({
    ok: true,
    data: user,
    token: token,
    refreshToken: refreshToken,
  })
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
  const { mercadopago, mentor_id, reservedTimes, student_id } = req.body

  // const user = req.user;
  // date, hour, meet

  try {
    // Guardar pago en mercadioago
    const mp = await MercadoPago.payment.save(mercadopago)

    const user = await userById(student_id)
    const mentor = await userById(mentor_id)

    //notificaion al estudiante de la compra
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
        duration: '60min',
        date: '15/03/2023',
        hour: reservedTimes[reservedTimes.length - 1].hour,
        meet: `https://meet.google.com/${mentor.meet}`,
        amount: 100,
      }
    )
    // notificacion al mentor
  
    const resp_mentor = await mailer(
      {
        to: mentor.email,
        subject: 'Tienes una nueva reunión agendada.',
        template: 'mentor2',
      },
      {
        name_student: user.name,
        name_mentor: mentor.name,
        linkedin_mentor: mentor.linkedin,
        duration: '60min',
        date: '15/03/2023',
        hour: reservedTimes[reservedTimes.length - 1].hour,
        meet: `https://meet.google.com/${mentor.meet}`,
        amount: 100,
      }
    )

    //Notificación a FEEDINGMINDS
    const resp_feeding = await mailer(
      {
        to: "feedingminds.pe@gmail.com",
        subject: 'Se agendó una nueva reunión',
        template: 'feeding',
      },
      {
        name_student: user.name,
        name_mentor: mentor.name,
        linkedin_mentor: mentor.linkedin,
        duration: '60min',
        date: '15/03/2023',
        hour: reservedTimes[reservedTimes.length - 1].hour,
        meet: `https://meet.google.com/${mentor.meet}`,
        amount: 100,
      }
    )

    //Actualice la informacion del mentor
    const options = {
      returnDocument: 'after',
    }
    await User.findByIdAndUpdate(mentor_id, { reservedTimes }, options)

    res.status(200).json({
      ...resp,
      ok: true,
      message: 'Pago de forma correcta',
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'No se pudo realizar el pago de forma correcta',
      error,
    })
  }
}

module.exports = {
  getUsers,
  postUsers,
  patchUsers,
  getUser,
  generateOrder,
}
