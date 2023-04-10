// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";
import {getAuth} from "firebase/compat/auth";
import 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage, ref, uploadBytes } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtv_WVJlNJ48P0LzU0DNuNwY004xeAuaw",
  authDomain: "chatbuddy-77c0c.firebaseapp.com",
  projectId: "chatbuddy-77c0c",
  storageBucket: "chatbuddy-77c0c.appspot.com",
  messagingSenderId: "892580317416",
  appId: "1:892580317416:web:c8538f8264e55694c1e15d"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.initializeApp(firebaseConfig)
}
const app = firebase.initializeApp(firebaseConfig)



export {firebase};
export const db = getFirestore(app)