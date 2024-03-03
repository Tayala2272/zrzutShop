
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const app = initializeApp({
    apiKey: "AIzaSyDNhT1GcRMLVXgh6-n6ROxPl3E6-rAQY_Y",
    authDomain: "zrzutshop.firebaseapp.com",
    databaseURL: "https://zrzutshop-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "zrzutshop",
    storageBucket: "zrzutshop.appspot.com",
    messagingSenderId: "615860420744",
    appId: "1:615860420744:web:60d96003e6f8b0046edf3d",
    measurementId: "G-MWY3Q19VBT"
  });


const analytics = getAnalytics(app)
const db = getFirestore(app)
const auth = getAuth(app)
const firebase = app

export {db, auth,firebase}
