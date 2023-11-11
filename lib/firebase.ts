import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log("Firebase initialization error");
  }
} else {
  app = getApp();
  auth = getAuth();
}

export { auth };
