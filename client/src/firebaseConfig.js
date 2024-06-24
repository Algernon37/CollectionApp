import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getFirestore, addDoc, getDoc, getDocs, deleteDoc, doc, query, where, writeBatch, updateDoc, limit, orderBy } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALxxrDGTZ2EDK5Ts8B5Ef28OGRBE-cY4c",
  authDomain: "finalexam-3053e.firebaseapp.com",
  projectId: "finalexam-3053e",
  storageBucket: "finalexam-3053e.appspot.com",
  messagingSenderId: "213579837988",
  appId: "1:213579837988:web:f20d47228341280f3e9eb1",
  measurementId: "G-Q633EFJ9CZ"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, collection, addDoc, getDocs, deleteDoc, doc, query, where, writeBatch, getDoc, updateDoc, storage, ref, uploadBytes, getDownloadURL, limit, orderBy };