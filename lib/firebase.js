import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAR5fVv2qLR0gZrJhm0h7rd55FNfKAApL0",
    authDomain: "thermal-effort-329612.firebaseapp.com",
    projectId: "thermal-effort-329612",
    storageBucket: "thermal-effort-329612.appspot.com",
    messagingSenderId: "938838256753",
    appId: "1:938838256753:web:6971da8f18816696bfffd0",
    measurementId: "G-7VLPNVJWZM"
};

// Initialize Firebase
const app = getApps().length? getApp() : initializeApp({apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID})

const db = getFirestore(app)
const auth = getAuth(app)

export {db, auth}
