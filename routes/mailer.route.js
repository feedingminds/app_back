const express = require('express');
const { response } = require('express')
var nodemailer = require('nodemailer');

/*
const { check } = require('express-validator')
const { existsUserById } = require('../helpers/db-validators')
const { validateFields } = require('../middlewares')
*/
const router = express.Router()

router.get('/', [response.status(200).json()])

router.post('/',
  () => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tucorreo@gmail.com',
        pass: 'tucontraseña'
      }
    });

    var message = "Hola desde nodejs...";

    var mailOptions = {
      from: 'tucorreo@gmail.com',
      to: 'mi-amigo@yahoo.com',
      subject: 'Asunto Del Correo',
      text: message
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
      }
    });
    response.status(200).json()
  }
)

module.exports = router
