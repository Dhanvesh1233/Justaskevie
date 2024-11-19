// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBVcTZi_VD_jQZYfRmuBEiWdTYmIiIlrr0",
  authDomain: "justaskevie-e611a.firebaseapp.com",
  projectId: "justaskevie-e611a",
  storageBucket: "justaskevie-e611a.firebasestorage.app",
  messagingSenderId: "1085142770329",
  appId: "1:1085142770329:web:7784edbcf343f801064e08",
  measurementId: "G-PWC7JL28KS"
});

const messaging = firebase.messaging();

// Variable to track if a notification is already shown
let isNotificationVisible = false;

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // Avoid showing the same notification multiple times
  if (isNotificationVisible) {
    console.log('Notification already displayed, ignoring new push');
    return;
  }

  const notificationTitle = payload.notification.title;
  const notificationBody = payload.notification.body;
  const notificationIcon = payload.notification.icon || '/icon.png'; // Default to '/icon.png'

  const notificationOptions = {
    body: notificationBody,
    icon: notificationIcon,
  };

  // Mark notification as shown
  isNotificationVisible = true;

  // Show the notification
  self.registration.showNotification(notificationTitle, notificationOptions);

  // Reset notification flag after a delay to allow next notifications
  setTimeout(() => {
    isNotificationVisible = false;
  }, 5000);  // Adjust the time delay if needed
});
