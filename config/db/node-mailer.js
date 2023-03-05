const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
require('dotenv').config()

const options = {
  viewEngine: {
    extname: '.handlebars', // handlebars extension
    layoutsDir: 'views/email/', // location of handlebars templates
    defaultLayout: 'main', // name of main template
    partialsDir: 'views/email/', // location of your subtemplates aka. header, footer etc
  },
  viewPath: 'views/email',
  extName: '.handlebars',
}

const mailer = async ({ to, subject, template }, context) => {
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
    to,
    subject,
    template,
    context,
  })
  transporter.close()
  return {
    messageId: info.messageId,
    previewUrl: nodemailer.getTestMessageUrl(info),
  }
}

module.exports = {
  mailer,
}
