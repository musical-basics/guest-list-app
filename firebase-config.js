// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXeF5RmiuS4L6QYlAdVPdM_NOdNk3a0lg",
  authDomain: "lionel-guest-list.firebaseapp.com",
  databaseURL: "https://lionel-guest-list-default-rtdb.firebaseio.com",
  projectId: "lionel-guest-list",
  storageBucket: "lionel-guest-list.appspot.com",
  messagingSenderId: "454072719270",
  appId: "1:454072719270:web:01af4f7e9329ecf03c6167",
  measurementId: "G-Q7VPQRSHLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);