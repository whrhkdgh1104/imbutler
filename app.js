const app = require('express')();
const http = require('http').createServer(app);
const PORT = process.env.PORT;

const admin = require('firebase-admin');
const serviceAccount = require('./imbutler-7ed53-firebase-adminsdk-pfsc9-a1ba829fb1.json');

const fcm_admin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

const registrationToken = 'cqf9yRdMRMmv1nkLEf4M7O:APA91bFlGP9SaovOxEWtyOAlOiKH-3Pg2bc-ioaOFPkvtKqghl7HVs5i1H84h7Ij3PEhvgjraGZbsLBlD502RLYlP5c_hLLVSCH2mpsn6gaUQH7Z4wPPf1IuDQ_tMSxtakSnw0NhR2nQ';

io.on('connection', (socket) => {
    socket.on('request_message', (msg) => {
        io.emit('response_message', msg);
        
        var message = {
            notification: {
                title: 'Test Title',
                body: msg
            },
            android: {
              notification: {
                click_action: 'NOTIFICATION_CHAT'
              }
            },
            data: {
                title: 'Test Title',
                body: msg
            },
            token: registrationToken
        };

        fcm_admin.messaging().send(message)
            .then((response) => {
                console.log('Successfully sent message:', response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
            });

    });

    socket.on('disconnect', async() => {
        console.log('user disconnected');
    });
});

// express 서버를 실행할 때 필요한 포트 정의 및 실행 시 callback 함수를 받습니다
http.listen(80, () => {
    console.log('start! express server : ' + PORT);
});