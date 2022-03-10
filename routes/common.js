const db = require('../db/config');
const bcrypt = require('bcrypt');
const bcrypt_saltRounds = 10;

/* 메세지 창 띄우기(alert) */
function alert(res, msg, url = '') {
    var script = '<script type="text/javascript">alert("' + msg + '");</script>';
    if(url) {
        script += '<script type="text/javascript">location.href="' + url + '";</script>';
    } else {
        script += '<script type="text/javascript">history.back();</script>';
    }

    res.send(script);
}
module.exports.alert = alert;

/* 회원가입 */
function register(res, param, result) {
    bcrypt.hash(param[1], bcrypt_saltRounds, (err, hash) => {
        param[1] = hash;
        db.query('insert into member(`mb_username`, `mb_password`, `mb_name`, `mb_phone`, `mb_address`) values (?,?,?,?,?)',
                    param, (err, row) => {
                        var result_;
                        if(err) {
                            console.log(err);
                            result_ = err.code;
                        } else
                            result_ = 'SUCCESS';
                        return result(result_);
                    });
    })
}
module.exports.register = register;

/* 로그인 */
function login_check(username, password, result) {
    var login = new Promise((resolve, reject) => {
        db.query('select * from member where mb_username = ?',
                    username, (err, row) => {
                        if(err) {
                            console.log(err);
                            reject(err);
                        } else
                            if(row.length > 0)
                                resolve(password);
                            else
                                reject(Error('ERR_ID'));
                    });
    });
    login.then()
    db.query('select * from member where mb_username = ?',
                username, (err, row) => {
                    var result_;
                    if(err) {
                        console.log(err);
                        result_ = err.code;
                    }
                    else
                        if(row.length > 0)
                            bcrypt.compare(password, row[0].mb_password, (err, result__) => {
                                if(result__)
                                    result_ = 'SUCCESS';
                                else
                                    result_ = 'ERR_PW';
                            });
                        else
                            result_ = 'ERR_ID';
                    return result(result_);
                });
}
module.exports.login_check = login_check;