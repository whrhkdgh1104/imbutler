const mysql = require('mysql');

const db = mysql.createPool({
    host: 'acw2033ndw0at1t7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'kedt2qt4vxavipmy',
    password: 'x8nt9oyzwpi6fb2b',
    port: 3306,
    database: 'lxpua62nbegcuq01',
    charset: 'utf8mb4'
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