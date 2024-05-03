require('dotenv/config')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

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
app.use('/system', system.router)

//Util
const util = require('./routes/utilRoute')
app.use('/util', util.router)

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
