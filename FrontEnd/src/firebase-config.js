// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDZnngTTAotd0ohxhUvTFRdBRwoDu4Rm84",
    authDomain: "restaurant-website-5ec67.firebaseapp.com",
    projectId: "restaurant-website-5ec67",
    storageBucket: "restaurant-website-5ec67.appspot.com",
    messagingSenderId: "1072651397612",
    appId: "1:1072651397612:web:5569e20971eff2dab278c9",
    measurementId: "G-Z164WCPCJZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };
