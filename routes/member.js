var common = require('./common');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* 회원가입 페이지 렌더링 */
router.get('/register', function(req, res, next) {
  if(req.session.logined) {
    common.href(res);
  } else {
    res.render('member/register', {
      title: '회원가입'
    });
  }
});

/* 회원가입 */
router.post('/register', function(req, res, next) {
  const param = [req.body.username, 
                 req.body.password,
                 req.body.name,
                 req.body.phone,
                 req.body.addrRoad + ' ' + req.body.addrDetail];
  common.register(res, param, (result) => {
    switch(result) {
      case 'SUCCESS':
        common.alert(res, '회원가입이 완료되었습니다.', '/');
        break;
      case 'ER_DUP_ENTRY':
        common.alert(res, '이미 존재하는 회원입니다.');
        break;
      default:
        common.alert(res, '에러 발생 : ' + result);
    }
  });
});

/* 로그인 페이지 렌더링 */
router.get('/login', function(req, res, next) {
  if(req.session.logined) {
    common.href(res);
  } else {
    res.render('member/login', {
      title: '로그인'
    });
  }
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

/* 로그아웃 */
router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/member/login');
});

/* 주소 검색 팝업 렌더링 */
router.post('/popup/jusoPopup', function(req, res, next) {
  res.locals = req.body;
  res.render('member/jusoPopup');
});
router.get('/popup/jusoPopup', function(req, res, next) {
  res.render('member/jusoPopup');
});

module.exports = router;
