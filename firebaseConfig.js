// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBB4K9qKnTcMmUxzDktkEDWXzMMSy0hdAk",
    authDomain: "dormdeals-4937a.firebaseapp.com",
    projectId: "dormdeals-4937a",
    storageBucket: "dormdeals-4937a.appspot.com",
    messagingSenderId: "655364243195",
    appId: "1:655364243195:web:e3c6ae84202d4fa3413a5e",
    measurementId: "G-JEXVJB95YP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);