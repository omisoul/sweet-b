import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBDFN7Xe1z0MhGVfYaKw5JZoNc6a_Z7D8Q',
  authDomain: 'sweet-bs.firebaseapp.com',
  databaseURL: 'https://sweet-bs.firebaseio.com',
  projectId: 'sweet-bs',
  storageBucket: 'sweet-bs.appspot.com',
  messagingSenderId: '540013480402',
  appId: '1:540013480402:web:29a0198a514bd4182da00b',
  measurementId: 'G-0JD0VJXZCF',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export const createUserProfileDoc = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    const role = 'customer';
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        role,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user', error.message);
    }
  }

  return getUserDoc(user.uid);
};

export const getUserDoc = async (uid) => {
  if (!uid) return null;

  try {
    const userDoc = await firestore.collection('users').doc(uid).get();

    return { uid, ...userDoc.data() };
  } catch (error) {
    console.error('Error fetching the user', error.message);
  }
};
export const getTimestamp = (date) => {
  return firebase.firestore.Timestamp.fromDate(date);
};
export const addToArray = (val) => {
  return firebase.firestore.FieldValue.arrayUnion(val);
};
export default firebase;
