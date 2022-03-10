const mysql = require('mysql');

const db = mysql.createPool({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'bd754aceb1b6d6',
    password: '75b8e7a1',
    port: 3306,
    database: 'heroku_5adb670a14fc2e7'
});

// function handleDisconnect() {
//     db.connect(function(err) {
//         if(err) {
//             console.log('error when connecting to db:', err);
//             setTimeout(handleDisconnect, 2000);
//         }
//     });

//     db.on('error', function(err) {
//         console.log('db error', err);
//         if(err.code === 'PROTOCOL_CONNECTION_LOST') {
//             return handleDisconnect();
//         } else {
//             throw err;
//         }
//     });
// }

// handleDisconnect();

module.exports = db;