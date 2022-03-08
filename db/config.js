const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'bd754aceb1b6d6',
    password: '75b8e7a1',
    port: 3306,
    database: 'heroku_5adb670a14fc2e7'
});