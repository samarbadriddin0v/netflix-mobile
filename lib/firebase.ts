import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getFirestore,
} from "firebase/firestore";
import { IAccount } from "../types";

const firebaseConfig = {
  apiKey: "AIzaSyCc2V8wy-EyahLrWPtd3uk4Z4ynTBGZhwU",
  authDomain: "netflix-f2ccb.firebaseapp.com",
  projectId: "netflix-f2ccb",
  storageBucket: "netflix-f2ccb.appspot.com",
  messagingSenderId: "314772447629",
  appId: "1:314772447629:web:23432cae6615b476be9dc4",
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
    db = getFirestore(app);
  } catch (error) {
    console.log("Firebase initialization error");
  }
} else {
  app = getApp();
  auth = getAuth();
  db = getFirestore();
}

export { auth, db };

export const createAccount = async (data: IAccount) => {
  const { _id, name, pin, uid } = data;
  const account = await addDoc(collection(db, "accounts"), {
    name,
    uid,
    pin,
    _id,
  });
  return account;
};
