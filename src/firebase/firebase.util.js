import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAk3d0ybaU3a5ULLuxU_urjLAYVWojt8C4",
    authDomain: "crown-db-5a1c9.firebaseapp.com",
    databaseURL: "https://crown-db-5a1c9.firebaseio.com",
    projectId: "crown-db-5a1c9",
    storageBucket: "crown-db-5a1c9.appspot.com",
    messagingSenderId: "491305117698",
    appId: "1:491305117698:web:fe6f14e1398177da43df1b",
    measurementId: "G-7WJ5M16YY9"
  
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;