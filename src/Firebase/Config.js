// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBd5N1WYbmzRz8J1zFdPBn-s2v-fckNlsE",
    authDomain: "athletebeta-ed065.firebaseapp.com",
    projectId: "athletebeta-ed065",
    storageBucket: "athletebeta-ed065.appspot.com",
    messagingSenderId: "805980998701",
    appId: "1:805980998701:web:ba6247b1315ff74b73fca4",
    measurementId: "G-Z5B87YPQWR"
};

///if(!firebase.apps.length){
//    firebase.initializeApp(firebaseConfig);
//}

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();

export { firebase };
