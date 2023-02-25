import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBB4K9qKnTcMmUxzDktkEDWXzMMSy0hdAk",
    authDomain: "dormdeals-4937a.firebaseapp.com",
    projectId: "dormdeals-4937a",
    storageBucket: "dormdeals-4937a.appspot.com",
    messagingSenderId: "655364243195",
    appId: "1:655364243195:web:e3c6ae84202d4fa3413a5e",
    measurementId: "G-JEXVJB95YP"
};
firebase.initializeApp(firebaseConfig);
export default firebase;


