const { request, response } = require('express')
const nodemailer = require('nodemailer');

const postMailer = async (req = request, res = response) => {
    const { to, subject, message } = req.body

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'wilfred6@ethereal.email',
          pass: 'BVYzPxTjjPCz8JxbzE'
      }
    });

    let info = await transporter.sendMail({
        from: '"Wilfred Hoppe" <wilfred6@ethereal.email>', // sender address,
        to: to,
        subject: subject,
        // text: 'Hello World'
        html: message
    })

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
    transporter.close(); 

    res.json({
      messageId: info.messageId,
      previewUrl:  nodemailer.getTestMessageUrl(info)
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