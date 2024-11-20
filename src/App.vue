<template>
  <router-view />
</template>

<script setup>
// Importing required Firebase modules for app initialization and messaging functionality
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const firebaseConfig = {
  // Firebase configuration object containing your Firebase project credentials
  apiKey: "AIzaSyBVcTZi_VD_jQZYfRmuBEiWdTYmIiIlrr0",
  authDomain: "justaskevie-e611a.firebaseapp.com",
  projectId: "justaskevie-e611a",
  storageBucket: "justaskevie-e611a.firebasestorage.app",
  messagingSenderId: "1085142770329",
  appId: "1:1085142770329:web:7784edbcf343f801064e08",
  measurementId: "G-PWC7JL28KS"
};
// Initialize Firebase app using the above configuration
const app = initializeApp(firebaseConfig);
// Get the Firebase Messaging instance for this app
const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});
// Request the Firebase Cloud Messaging (FCM) registration token needed for sending push notifications
getToken(messaging, { vapidKey: 'BLtFUStMBVu3ayzisG-EMMMHChnfY-5nrsi-TqMfiv311HEOUXCdwCQFbffjWKGpAJw7bLlYgx8FEfIVUdpFRig' }).then((currentToken) => {
  if (currentToken) {
    // If a token is available, log it to the console
    console.log("Token is :",currentToken);
  } else {
    console.log('No registration token available. Request permission to generate one.');
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
});
</script>
