// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9PPlb9wQWUyWA27J1H5J-iDfQPRaXF84",
  authDomain: "saketh-word-book.firebaseapp.com",
  projectId: "saketh-word-book",
  storageBucket: "saketh-word-book.firebasestorage.app",
  messagingSenderId: "997071333573",
  appId: "1:997071333573:web:b28d66e40de6ccf74328ac",
  measurementId: "G-RM5GEC4X6B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
