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
    if(result == 'SUCCESS') {
      common.update_token(req.body.username, req.body.token, (result) => {
        res.send(result);
      });
    } else
      res.send(result);
  });
});

/* 로그아웃 */
router.post('/logout', function(req, res, next) {
  common.remove_token(req.body.token, (result) => {
    res.send(result);
  });
});

/* 회원정보 */
router.post('/getUser', function(req, res, next) {
  common.getUser(req.body.username, (user) => {
    if(user)
      res.send(user);
    else
      res.send('ERR_NULL');
  })
})

/* 주소검색 */
router.get('/jusoElement', function(req, res, next) {
  res.render('member/jusoElement');
});

module.exports = router;
