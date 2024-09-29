import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
export const auth = getAuth(app);
export const db = getFirestore(app);
