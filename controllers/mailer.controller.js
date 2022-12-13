const { request, response } = require('express')
const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
require('dotenv').config()

const options = {
  viewEngine: {
    extname: '.handlebars', // handlebars extension
    layoutsDir: 'views/email/', // location of handlebars templates
    defaultLayout: 'template', // name of main template
    partialsDir: 'views/email/', // location of your subtemplates aka. header, footer etc
  },
  viewPath: 'views/email',
  extName: '.handlebars',
}

const postMailer = async (req = request, res = response) => {
  const { to, subject, name, duration, date, hour, meet } = req.body

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  })

  transporter.use('compile', hbs(options))

  let info = await transporter.sendMail({
    from: process.env.MAIL_FROM_NAME + process.env.MAIL_FROM_ADDRESS, // sender address,
    to: to,
    subject: subject,
    template: 'template',
    context: {
      name,
      duration,
      date,
      hour,
      meet,
    },
  })

  console.log('Message sent: %s', info.messageId)
  // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  transporter.close()

  res.json({
    messageId: info.messageId,
    previewUrl: nodemailer.getTestMessageUrl(info),
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
