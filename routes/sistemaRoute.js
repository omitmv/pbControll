const express = require('express')

const router = express.Router()

router.get('/', function(req, res, next) {
    try {
        const conn = require('../config/db')
        conn.query(
            `SELECT * FROM tbSistema ORDER BY cdSistema`,
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

module.exports = { router }