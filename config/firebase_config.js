var admin = require('firebase-admin');
var serAccount = require('./firebase_adminSDK.json');

admin.initializeApp({
  credential: admin.credential.cert(serAccount)
});

function fcm_msg(from, to, msg, token, type='chat') {
  if(token.length) {
    var msg = {
      data: {
        title: from,
        body: msg,
        to: to,
        type: type
      },
      tokens: token
    }
    
    admin.messaging().sendMulticast(msg)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
  } else
    console.log('Successfully sent message: No one received')
}
module.exports.fcm_msg = fcm_msg;