const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', function(req, res, next) {
    res.status(200).json({
        title: 'Express'
    })
})

//Usuário
const user = require('./routes/usuarioRoute')
app.use('/user', user.router)

//Cliente
const client = require('./routes/clienteRoute')
app.use('/client', client.router)

//Sistema
const system = require('./routes/sistemaRoute')
app.use('/system', system.router)

const port = 3001

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})