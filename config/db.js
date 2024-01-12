const mysql = require('mysql')

const conn = mysql.createPool({
    host: '162.241.2.229',
    user: 'hifite99_user',
    password: 'Raf@e46c15',
    database: 'hifite99_dados'
})

module.exports = conn