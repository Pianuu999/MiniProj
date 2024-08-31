// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgwuFsnOXivuNawxld9uceOWcc60ltMBE",
  authDomain: "mini-59d3c.firebaseapp.com",
  projectId: "mini-59d3c",
  storageBucket: "mini-59d3c.appspot.com",
  messagingSenderId: "921714433200",
  appId: "1:921714433200:web:40be8b1c3a74026d0f2f75",
  measurementId: "G-B48F6Q8PW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth };