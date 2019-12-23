import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAk3d0ybaU3a5ULLuxU_urjLAYVWojt8C4",
  authDomain: "crown-db-5a1c9.firebaseapp.com",
  databaseURL: "https://crown-db-5a1c9.firebaseio.com",
  projectId: "crown-db-5a1c9",
  storageBucket: "crown-db-5a1c9.appspot.com",
  messagingSenderId: "491305117698",
  appId: "1:491305117698:web:fe6f14e1398177da43df1b",
  measurementId: "G-7WJ5M16YY9"
};

export const createUserProfileDocument = async (userAuth, additionData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collections.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
