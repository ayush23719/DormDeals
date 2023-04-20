import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
// import Constants from 'expo-constants';
const firebaseConfig = {
    apiKey: "AIzaSyBHQyvrP-oWiJR_I6D-BV_o6HNy4Y3hrWo",
    authDomain: "dormdeals-2f82a.firebaseapp.com",
    projectId: "dormdeals-2f82a",
    storageBucket: "dormdeals-2f82a.appspot.com",
    messagingSenderId: "1038598232386",
    appId: "1:1038598232386:web:4e1fd15c9ee6ab801bd0db",
    measurementId: "G-YYRRX0VQTE"
};
firebase.initializeApp(firebaseConfig);
export default firebase;