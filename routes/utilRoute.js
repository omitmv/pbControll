const express = require('express')
const nodemailer = require('nodemailer')

const router = express.Router()

router.post('/send-email', (req, res) => {
  const { smtp, smtpPort, emailFrom, emailPassword, subject, message, emails } =
    req.body

  const transporter = nodemailer.createTransport({
    host: smtp,
    port: smtpPort,
    secure: false,
    auth: {
      user: emailFrom,
      pass: emailPassword
    }
  })

  for (let i = 0; i < emails.length; i++) {
    const mailOptions = {
      from: emailFrom,
      to: emails[i].email,
      subject,
      text: message
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
        res.status(500).send('Ocorreu um erro ao enviar o e-mail.')
      } else {
        console.log('Email enviado: ' + info.response)
        res.status(200).send('E-mail enviado com sucesso!')
      }
    })
  }
})

module.exports = { router }
