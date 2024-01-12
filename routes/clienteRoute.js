const express = require('express')

const router = express.Router()

router.put('/', function(req, res, next) {
    try {
        const conn = require('../config/db')
        var params = {
            tpCliente: req.body.tpCliente,
            cpfcnpj: req.body.cpfcnpj,
            rg: req.body.rg,
            ie: req.body.ie,
            flStatus: req.body.flStatus,
            nomeRsocial: req.body.nomeRsocial
        }
        conn.query(
            `UPDATE tbCliente SET ? WHERE cdCliente = ${req.body.cdCliente}`,
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
            `SELECT * FROM tbCliente ORDER BY cdCliente`,
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
        var params = [
            req.body.tpCliente,
            req.body.cpfcnpj,
            req.body.rg,
            req.body.ie,
            req.body.flStatus,
            req.body.nomeRsocial
        ]
        conn.query(
            `INSERT INTO tbCliente( tpCliente, cpfcnpj, rg, ie, flStatus, nomeRsocial, dtCadastro
            )VALUES( ?, ?, ?, ?, ?, ?, SYSDATE() )`,
            params,
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

module.exports = { router }