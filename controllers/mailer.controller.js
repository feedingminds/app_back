const { request, response } = require('express')
const { mailer } = require('../config/mailer/node-mailer')
const { userById } = require('../services/user.service')

// Datos a enviar
// {
//   "student_id": "63efa01f56034d704552d19d",
//   "mentor_id": "63f2ec3956034d704552d31b",
//   "date": "15/03/2023" ,
//   "hour": "3:00PM",
//   "meet": "https://meet.google.com/tfn-kvpr-fba"
// }

const postMailer = async (req = request, res = response) => {
  const { student_id, mentor_id, date, hour, meet } = req.body

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
        date,
        hour,
        meet,
      }
    )

    res.status(200).json({
      ...resp,
      ok: true,
      message: 'Correo enviado',
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'algo fallo',
    })
  }
}

const GetMailer = async (req = request, res = response) => {
  res.json({
    message: 'Hello World!',
  })
}

module.exports = {
  postMailer,
  GetMailer,
}
