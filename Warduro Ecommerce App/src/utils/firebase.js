// Import the functions you need from the SDKs you need
import { initializeApp , getApps, getApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const databaseConfig = {
  apiKey: import.meta.env.VITE_DATABASE_API_KEY,
  authDomain: import.meta.env.VITE_DATABASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_DATABASE_PROJECT_ID,
  databaseURL: import.meta.env.VITE_DATABASE_DATABASE_URL,
  storageBucket: import.meta.env.VITE_DATABASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_DATABASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_DATABASE_APP_ID,
  measurementId: import.meta.env.VITE_DATABASE_MEASUREMENT_ID
};

const storageConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Storage App
const storageApp = getApps().length
  ? getApp("storageApp")
  : initializeApp(storageConfig, "storageApp");
const storage = getStorage(storageApp);
const storageDB = getStorage(storageApp);

// Initialize Database App

const app = getApps().find((app) => app.name === "[DEFAULT]")
  ? getApp("[DEFAULT]")
  : initializeApp(databaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // console.log("user is present")
  } else {
      // console.log("User not exist")
  }
  
})













export {
  storage,
  auth,
  db,
  storageDB,
 
}