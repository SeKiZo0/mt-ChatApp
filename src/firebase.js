// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCSbels9BKXVW3nFm7TacsclZQnk6WZNQA",
  authDomain: "chatapp-20260.firebaseapp.com",
  projectId: "chatapp-20260",
  storageBucket: "chatapp-20260.appspot.com",
  messagingSenderId: "1049813964385",
  appId: "1:1049813964385:web:1dc92a6987f448b4223c20",
  measurementId: "G-9BZZRWNKME"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);