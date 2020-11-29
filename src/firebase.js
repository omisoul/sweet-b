import  firebase  from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';


const firebaseConfig = {
    apiKey: "AIzaSyBDFN7Xe1z0MhGVfYaKw5JZoNc6a_Z7D8Q",
    authDomain: "sweet-bs.firebaseapp.com",
    databaseURL: "https://sweet-bs.firebaseio.com",
    projectId: "sweet-bs",
    storageBucket: "sweet-bs.appspot.com",
    messagingSenderId: "540013480402",
    appId: "1:540013480402:web:29a0198a514bd4182da00b",
    measurementId: "G-0JD0VJXZCF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const firestore = firebase.firestore();
export const getTimestamp = date => { return firebase.firestore.Timestamp.fromDate(date) }
export default firebase;