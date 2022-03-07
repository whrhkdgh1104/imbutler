const app = require('express')();
const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    socket.on('request_message', (msg) => {
        io.emit('response_message', msg);
    });

    socket.on('disconnect', async() => {
        console.log('user disconnected');
    });
});

// express 서버를 실행할 때 필요한 포트 정의 및 실행 시 callback 함수를 받습니다
http.listen(80, () => {
    console.log('start! express server');
});