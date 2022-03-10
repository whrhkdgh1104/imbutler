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
    switch(result) {
      case 'SUCCESS':
        res.send('회원가입이 완료되었습니다.');
        break;
      case 'ER_DUP_ENTRY':
        res.send('이미 존재하는 회원입니다.');
        break;
      default:
        res.send('에러 발생 : ' + result);
    }
  });
});

/* 로그인 */
router.post('/login', function(req, res, next) {
  common.login(req.body.username, req.body.password, (result) => {
    switch(result) {
      case 'SUCCESS':
        req.session.regenerate(function() {
          req.session.logined = true;
          req.session.username = req.body.username;
          res.redirect('/');
        });
        break;
      case 'ERR_ID':
        common.alert(res, '등록되지 않은 회원입니다.');
        break;
      case 'ERR_PW':
        common.alert(res, '비밀번호가 일치하지 않습니다.');
        break;
      default:
        common.alert(res, '에러발생 : ' + result);
    }
  });
});

module.exports = router;
