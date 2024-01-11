const mysql = require('mysql')
const conn = mysql.createConnection({
    host: '162.241.2.229',
    user: 'hifite99_user',
    password: 'Raf@e46c15',
    database: 'hifite99_dados'
})

conn.connect(function(error) {
    if (!!error) {
        console.log(error)
    } else {
        console.log('Connected...')
    }
})

module.exports = conn