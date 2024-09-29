// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQBeOsxWRA0Xdr8WUQMqiM3hkcoY_Y1_8",
  authDomain: "goodbudget-61284.firebaseapp.com",
  projectId: "goodbudget-61284",
  storageBucket: "goodbudget-61284.appspot.com",
  messagingSenderId: "758125397832",
  appId: "1:758125397832:web:4bcdb6f986013214ba957d",
  measurementId: "G-5GYE78VNMG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
