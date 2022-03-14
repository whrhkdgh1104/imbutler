var common = require('./common');
var express = require('express');
var router = express.Router();

/* 주소검색 */
router.get('/room', function(req, res, next) {
    res.render('chat/room', {
      title: 'Chat',
      user: req.session.user
    });
});

module.exports = router;