// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiUlKJf3ts6gHLEC79sNLReblsN3v6UvU",
  authDomain: "miniproject-e3e3a.firebaseapp.com",
  projectId: "miniproject-e3e3a",
  storageBucket: "miniproject-e3e3a.firebasestorage.app",
  messagingSenderId: "739574724402",
  appId: "1:739574724402:web:99925ea6b9ad5f4882492b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
