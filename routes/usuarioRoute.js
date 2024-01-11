const express = require('express')

const router = express.Router()

router.get('/', function(req, res, next) {
    try {
        const conn = require('../config/db')
        conn.query(
            `SELECT * FROM tbUsuario ORDER BY cdUsuario`,
            function(err, rows) {
                if (err) {
                    res.status(401).json({ error: err })
                } else {
                    res.status(200).json({ data: rows })
                }
                conn.destroy()
            }
        )
    } catch (e) {
        res.status(401).json({ error: e })
    }
})

router.post('/', function(req, res, next) {
    try {
        const conn = require('../config/db')
        conn.query(
            `INSERT INTO tbUsuario(login, senha)
            VALUES("${req.body.login}", "${req.body.senha}")`,
            function(err, data) {
                if (err) {
                    res.status(401).json({ error: err })
                } else {
                    res.status(200).json({ data })
                }
                conn.destroy()
            }
        )
    } catch (e) {
        res.status(401).json({ error: e })
    }
})

router.delete('/', function(req, res, next) {
    try {
        const conn = require('../config/db')
        conn.query(
            `DELETE
            FROM tbUsuario
            WHERE cdUsuario = ${req.body.cdUsuario}`,
            function(err, reuslt) {
                if (err) {
                    res.status(401).json({ error: err })
                } else {
                    res.status(200).json({ data: reuslt })
                }
                conn.destroy()
            }
        )
    } catch (e) {
        res.status(401).json({ error: e })
    }
})

module.exports = { router }