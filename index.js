require('dotenv/config')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const app = express()

app.use(cors())
app.use(bodyParser.json())

//auth
const authRouter = require('./routes/authRoute')
app.use('/auth', authRouter.router)

//Usuário
const user = require('./routes/usuarioRoute')
app.use('/user', verifyJWT, user.router)

//Cliente
const client = require('./routes/clienteRoute')
app.use('/client', verifyJWT, client.router)

//Sistema
const system = require('./routes/sistemaRoute')
app.use('/system', verifyJWT, system.router)

//Utils
app.post('/send-email', (req, res) => {
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

//Verificar JWT
function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token']
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).end()
    next()
  })
}

const port = process.env.PORT_API || 443

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
