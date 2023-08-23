import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6xJXtyJBseLvA6AWQqPtadvG6aqtgYg8",
  authDomain: "stream-chat-86b23.firebaseapp.com",
  projectId: "stream-chat-86b23",
  storageBucket: "stream-chat-86b23.appspot.com",
  messagingSenderId: "773786280092",
  appId: "1:773786280092:web:2f9a05c43d8eee57650d59",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
