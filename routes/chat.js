var common = require('./common');
var express = require('express');
var router = express.Router();

/* 채팅 접근 */
router.get('/room', function(req, res, next) {
    if(req.session.user) {
        res.render('chat/room', {
        title: 'Chat',
        user: req.session.user
        });
    } else {
        common.alert(res, '로그인이 필요합니다.', '../member/login?callback=/chat/room');
    }
});

module.exports = router;