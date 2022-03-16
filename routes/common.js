const db = require('../config/db_config');
const bcrypt = require('bcrypt');
const bcrypt_saltRounds = 10;

/* 페이지 이동(href) */
function href(res, url = '') {
    var script;
    if(url)
        script = `<script type="text/javascript">location.href="${url}";</script>`;
    else
        script = `<script type="text/javascript">history.back();</script>`;

    res.send(script);
}
module.exports.href = href;

/* 메세지 창 띄우기(alert) */
function alert(res, msg, url = '') {
    var script = `<script type="text/javascript">alert("${msg}");</script>`;
    if(url)
        script += `<script type="text/javascript">location.href="${url}";</script>`;
    else
        script += `<script type="text/javascript">history.back();</script>`;

    res.send(script);
}
module.exports.alert = alert;

/* 회원가입 */
function register(res, param, result) {
    bcrypt.hash(param[1], bcrypt_saltRounds, (err, hash) => {
        param[1] = hash;
        db.query('insert into member(`mb_username`, `mb_password`, `mb_name`, `mb_phone`, `mb_address`) values (?,?,?,?,?)',
                    param, (err, row) => {
                        if(err) {
                            console.log(`register error(insert): ${err}`);
                            return result(`register error(insert): ${err.code}`);
                        } else
                            return result('SUCCESS');
                    });
    })
}
module.exports.register = register;

/* 로그인 */
function login(username, password, result) {
    db.query('select * from member where mb_username = ?',
                username, (err, row) => {
                    if(err) {
                        console.log(`login error(select): ${err}`);
                        return result(`login error(select): ${err.code}`);
                    }
                    else
                        if(row.length > 0)
                            bcrypt.compare(password, row[0].mb_password, (err, result__) => {
                                if(result__)
                                    return result('SUCCESS');
                                else
                                    return result('ERR_PW');
                            });
                        else
                            return result('ERR_ID');
                });
}
module.exports.login = login;

/* FCM Token 업데이트 */
function update_token(username, token, result) {
    const param = [username, token];
    db.query('select * from token where tk_token = ?', token, (err, row) => {
        if(err) {
            console.log(`update token error(select): ${err}`);
            return result(`update token error(select): ${err.code}`);
        } else
            if(row.length) {
                db.query('update token set tk_username = ? where tk_token = ?', param, (err, row) => {
                    if(err) {
                        console.log(`update token error(update): ${err}`);
                        return result(`update token error(update): ${err.code}`);
                    } else
                        return result('SUCCESS');
                });
            } else {
                db.query('insert into token(`tk_username`, `tk_token`) values(?,?)', param, (err, row) => {
                    if(err) {
                        console.log(`update token error(insert): ${err}`);
                        return result(`update token error(insert): ${err.code}`);
                    } else
                        return result('SUCCESS');
                });
            }
    });
}
module.exports.update_token = update_token;

/* FCM Token 삭제 */
function remove_token(token, result) {
    db.query('delete from token where tk_token = ?', token, (err, row) => {
        if(err) {
            console.log(`remove token error(delete): ${err}`);
            return result(`remove token error(delete): ${err.code}`);
        } else
            return result('SUCCESS');
    });
}
module.exports.remove_token = remove_token;

/* FCM Token 정보 */
function getTokens(username, tokens) {
    db.query('select tk_token from token where tk_username = ?', username, (err, row) => {
        if(err) {
            console.log(`getTokens error(select): ${err}`);
            tokens(null);
        } else {
            var tokens_ = new Array();
            for(var i in row)
                tokens_.push(row[i].tk_token);
            tokens(tokens_);
        }
    });
}
module.exports.getTokens = getTokens

/* 회원정보 */
function getUser(username, user) {
    db.query('select * from member where mb_username = ?', username, (err, row) => {
        if(err) {
            console.log(`getUser error(select): ${err}`);
            user(null);
        }
        else if(row.length > 0) {
            user(row[0]);
        }
        else
            user(null);
    });
}
module.exports.getUser = getUser;