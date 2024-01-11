const express = require('express')

const router = express.Router()

const ClienteModel = require('../model/ClienteModel')

router.put('/', function(req, res, next) {
    try {
        const conn = require('../config/db')
        if (!req.body.cdCliente) {
            throw new Error('DADOS INCONSISTENTES')
        }
        conn.query(
                `UPDATE tbCliente
            SET
            tpCliente = ${req.body.tpCliente},
            cpfcnpj = "${req.body.cpfcnpj}",
            rg = "${req.body.rg}",
            ie = "${req.body.ie}",
            flStatus = "${req.body.flStatus}",
            nomeRsocial = "${req.body.nomeRsocial}"
            WHERE cdCliente = ${req.body.cdCliente}`
            ),
            function(err, data) {
                if (err) {
                    res.status(401).json({ error: err })
                } else {
                    res.status(200).json({ data })
                }
                conn.destroy()
            }
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
                conn.destroy()
            }
        )
    } catch (e) {
        res.status(401).json({ error: e })
    }
})

router.post('/', function(req, res, next) {
    const client = new ClienteModel(
        0,
        req.body.tpCliente,
        req.body.cpfcnpj,
        req.body.rg,
        req.body.ie,
        req.body.flStatus,
        req.body.dtCadastro,
        req.body.nomeRsocial
    )
    try {
        const conn = require('../config/db')
        conn.query(
            `INSERT INTO tbCliente(
                tpCliente,
                cpfcnpj,
                rg,
                ie,
                flStatus,
                dtCadastro,
                nomeRsocial
            )VALUES(
                ${client.getTpCliente()},
                "${client.getCpfcnpj()}",
                "${client.getRg()}",
                "${client.getIe()}",
                "${client.getFlStatus()}",
                "${client.getDtCadastro()}",
                "${client.getNomeRsocial()}"
            )`,
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