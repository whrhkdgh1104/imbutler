var common = require('./common');
var express = require('express');
var router = express.Router();

/* 채팅 접근 */
router.get('/room', function(req, res, next) {
    if(req.query.to) {
        if(req.session.user) {
            res.render('chat/room', {
                title: 'Chat',
                user: req.session.user,
                to: req.query.to
            });
        } else {
            common.alert(res, '로그인이 필요합니다.', '../member/login?callback=/chat/room?to=' + req.query.to);
        }
    } else {
        common.alert(res, '비정상적인 접근입니다.');
    }
});

module.exports = router;