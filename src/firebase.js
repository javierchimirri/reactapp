import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAS9hgbzF_EQSY5YX1ElipCuET_kew_iPo",
    authDomain: "crud-react-f8ace.firebaseapp.com",
    projectId: "crud-react-f8ace",
    storageBucket: "crud-react-f8ace.appspot.com",
    messagingSenderId: "713917983079",
    appId: "1:713917983079:web:48dec76b2cb99288c327c2"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();