// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9_3wbS91WfsWIRWzIlOZLg6WeaLN95z4",
  authDomain: "ac-wallah.firebaseapp.com",
  projectId: "ac-wallah",
  //storageBucket: "ac-wallah.firebasestorage.app",
  storageBucket: "ac-wallah.appspot.com",
  messagingSenderId: "470887823767",
  appId: "1:470887823767:web:309f7814efefb89d762cd2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
