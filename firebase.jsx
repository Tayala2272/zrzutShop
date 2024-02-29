// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNhT1GcRMLVXgh6-n6ROxPl3E6-rAQY_Y",
  authDomain: "zrzutshop.firebaseapp.com",
  projectId: "zrzutshop",
  storageBucket: "zrzutshop.appspot.com",
  messagingSenderId: "615860420744",
  appId: "1:615860420744:web:60d96003e6f8b0046edf3d",
  measurementId: "G-MWY3Q19VBT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);