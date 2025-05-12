import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDP6XNlI1jUgHN3pVWIXNZjGT3YWXKSdes",
  authDomain: "gweenlearn.firebaseapp.com",
  projectId: "gweenlearn",
  storageBucket: "gweenlearn.firebasestorage.app",
  messagingSenderId: "915816429541",
  appId: "1:915816429541:web:65c885efda4472930c210c",
  measurementId: "G-RSGBWRE6BD"
};

// Initialize with a unique name
const app = initializeApp(firebaseConfig, 'comments-app');
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };
