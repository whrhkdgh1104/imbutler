var express = require('express');
var router = express.Router();

const db = require('../db/config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  if(req.session.logined) {
    res.redirect('/');
  } else {
    res.render('login', {session: req.session});
  }
})

router.post('/login', function(req, res, next) {
  req.session.regenerate(function() {
    req.session.logined = true;
    req.session.username = req.body.username;
    res.redirect('/');
  });
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/users/login');
});

module.exports = router;
