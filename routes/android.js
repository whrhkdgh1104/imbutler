var common = require('./common');
var express = require('express');
var router = express.Router();

/* 회원가입 */
router.post('/register', function(req, res, next) {
  const param = [req.body.username, 
                 req.body.password,
                 req.body.name,
                 req.body.phone,
                 req.body.address];
  common.register(res, param, (result) => {
      res.send(result);
  });
});

/* 로그인 */
router.post('/login', function(req, res, next) {
  common.login(req.body.username, req.body.password, (result) => {
      res.send(result);
  });
});

module.exports = router;
