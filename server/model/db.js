const mysql = require('mysql')
const dbConfig = require('../config/db')

const pool = mysql.createPool(dbConfig)

module.exports = pool