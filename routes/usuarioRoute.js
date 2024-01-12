const express = require('express')

const router = express.Router()

router.put('/', function(req, res, next) {
    try {
        const conn = require('../config/db')
        var params = {
            login: req.body.login,
            senha: req.body.senha,
            flAtivo: req.body.flAtivo
        }
        conn.query(
            `UPDATE tbUsuario SET ? WHERE cdUsuario = ${req.body.cdUsuario}`,
            params,
            function(err, data) {
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
})

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
            }
        )
    } catch (e) {
        res.status(401).json({ error: e })
    }
})

router.post('/', function(req, res, next) {
    try {
        const conn = require('../config/db')
        var params = [req.body.login, req.body.senha]
        conn.query(
            `INSERT INTO tbUsuario(login, senha)
            VALUES( ?, ? )`,
            params,
            function(err, data) {
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
            }
        )
    } catch (e) {
        res.status(401).json({ error: e })
    }
})

module.exports = { router }