require('dotenv/config')

const express = require('express')
const { criptGetToken } = require('../utils/cripto')

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const conn = require('../config/db')
    var params = [req.body.login, req.body.senha]
    conn.query(
      `SELECT * FROM tbUsuario WHERE login = ? AND senha = ?`,
      params,
      function (err, data) {
        if (err) {
          res.status(401).json({ error: err })
        } else {
          res.status(200).json({ data })
        }
      }
    )
  } catch (e) {
    res.status(401).json({ error: e })
  }
  /*
          if (req.body.value) {
            const value = atob(req.body.value)
            const { login, pass } = JSON.parse(value)
            const result = await auth(login, pass)
            if (result) {
              const token = criptGetToken(result)
              res
                .status(200)
                .json({ codigo: 200, message: `OK`, result: { auth: true, token } })
            } else {
              res.status(401).json({
                codigo: 401,
                message: `Usuário e/ou senha incorreto(s).`,
                result: { auth: false, token: '' }
              })
            }
          } else {
            res.status(401).json({
              codigo: 401,
              message: `Dados inconsistentes.`,
              result: {}
            })
          }
          */
})

module.exports = { router }
