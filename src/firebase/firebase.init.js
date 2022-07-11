// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcpTuXduTHK1XSeV6xBwJZfLPZF7uAdMo",
  authDomain: "mern-manufacturing.firebaseapp.com",
  projectId: "mern-manufacturing",
  storageBucket: "mern-manufacturing.appspot.com",
  messagingSenderId: "1074352826023",
  appId: "1:1074352826023:web:f6b24a0d8723e3752b5d82",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
