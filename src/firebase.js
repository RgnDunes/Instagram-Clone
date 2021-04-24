import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD1akpKj309hNVX81i7qEt2fMUUnWi_bZQ",
    authDomain: "dunes-instagram-clone-react.firebaseapp.com",
    projectId: "dunes-instagram-clone-react",
    storageBucket: "dunes-instagram-clone-react.appspot.com",
    messagingSenderId: "64333849828",
    appId: "1:64333849828:web:16aa23dfa1a9be54bd78f1",
    measurementId: "G-RG0QKR015K"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
