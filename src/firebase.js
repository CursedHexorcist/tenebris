import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs } from "@firebase/firestore"; // Perbarui ini


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwn_P0qQkA1T7VjVU1b9sXyj4Tky8WMp0",
  authDomain: "gweenlyn-be10b.firebaseapp.com",
  projectId: "gweenlyn-be10b",
  storageBucket: "gweenlyn-be10b.firebasestorage.app",
  messagingSenderId: "1038792659119",
  appId: "1:1038792659119:web:3a7312d23498b6d455445a",
  measurementId: "G-KGKV3SG752"
 };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
