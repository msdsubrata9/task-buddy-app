import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBOPnugnVYQKxdytSnx_Qy5Y4o4OTs8QXo",
  authDomain: "task-buddy-1cdbd.firebaseapp.com",
  projectId: "task-buddy-1cdbd",
  storageBucket: "task-buddy-1cdbd.firebasestorage.app",
  messagingSenderId: "404574199525",
  appId: "1:404574199525:web:80b63fa71e76f5e5e0be0c",
  measurementId: "G-97HP013ZD4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
