const { request, response } = require('express')
const nodemailer = require('nodemailer');

const sendMail = async (req = request, res = response) => {

    const { to, subject, message } = req.body
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // Cambiar valores a correo de prueba
          user: '--@gmail.com',
          pass: '---'
        }
      });    
      
      var mailOptions = {
        from: 'feedingminds.pe@gmail.com',
        to: to,
        subject: subject,
        text: message
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(201).json(
                {
                    "result":false,
                    "error":error
                }
            )
        } else {
            res.status(200).json(
                {
                    "result":true
                }
            )
        }
      });
    
    
  }

  module.exports = {
    sendMail,
  }