const { request, response } = require('express')
const { mailer } = require('../config/mailer/node-mailer')
const { userById } = require('../services/user.service')

const postMailer = async (req = request, res = response) => {
  const { student_id, mentor_id, date, hour, meet } = req.body

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

  res.json({
    ...resp,
  })
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
