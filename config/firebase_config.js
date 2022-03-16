var admin = require('firebase-admin');
var serAccount = require('../firebase_adminSDK.json');

admin.initializeApp({
  credential: admin.credential.cert(serAccount)
});

function fcm_msg(title, body, token, type='chat') {
    var msg = {
      data: {
        title: title,
        body: body,
        type: type
      },
      token: token
    }
    
    admin.messaging().send(msg)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
}
module.exports.fcm_msg = fcm_msg;