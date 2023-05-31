import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDB5lEV5yIcvzASoe0_UBivGw4kK1MN3wI",
  authDomain: "art-commission-3f275.firebaseapp.com",
  projectId: "art-commission-3f275",
  storageBucket: "art-commission-3f275.appspot.com",
  messagingSenderId: "485259661434",
  appId: "1:485259661434:web:036d2f0f82163ad5aeebc3",
  measurementId: "G-6BKYMV34RL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }