var admin = require("firebase-admin");

var serviceAccount = require("c:/Users/itnsp/Downloads/justaskevie-e611a-firebase-adminsdk-7by1f-47712aa96d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const registrationToken = 'd23L5LXxWV-YO0DwlmIfKV:APA91bGlH3PiEqvvUfARUtbK67LBjUKmPSgOUe4J2RjiY0gMAjiK7XLvKCVkXkvYqqiAYBQ_nwGKbBZ4QIb-7Rj46AHcDdX-KFdUZQQzm27YG5WQKJkMomw';

const message = {
    notification:{
        title: "Justaskevie",
        body: "Hi client"
    },
    // webpush:{
    //     fcmOptions:{
    //         link: '/?breakingnews'
    //     }
    // },
  token: registrationToken
};


admin.messaging().send(message)
  .then((response) => {
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
