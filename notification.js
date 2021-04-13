const admin = require('firebase-admin');

const serviceAccount = require('./fir-lato-firebase-adminsdk-r1jbe-c7be506996.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = {
  async sendNotification(token, message) {
    message.token = token;
    return await admin.messaging().send(message);
  }
};
