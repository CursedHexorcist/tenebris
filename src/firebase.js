import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs } from "@firebase/firestore"; // Perbarui ini


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDP6XNlI1jUgHN3pVWIXNZjGT3YWXKSdes",
  authDomain: "gweenlearn.firebaseapp.com",
  projectId: "gweenlearn",
  storageBucket: "gweenlearn.firebasestorage.app",
  messagingSenderId: "915816429541",
  appId: "1:915816429541:web:65c885efda4472930c210c",
  measurementId: "G-RSGBWRE6BD"
 };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
