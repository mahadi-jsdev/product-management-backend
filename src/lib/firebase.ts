import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import SECRETS from "./secret.js";

const firebaseConfig = {
  apiKey: SECRETS.FIREBASE_API_KEY,
  authDomain: SECRETS.FIREBASE_AUTH_DOMAIN,
  projectId: SECRETS.FIREBASE_PROJECT_ID,
  storageBucket: SECRETS.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: SECRETS.FIREBASE_MESSAGING_SENDER_ID,
  appId: SECRETS.FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
export { db };
