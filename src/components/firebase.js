import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Initialize Firebase
const firebaseApp = initializeApp({
  apiKey: "AIzaSyB8aSH-kgheoCz71Rusg2hkGjVJ8jjbDWs",
  authDomain: "fulfillments-admin.firebaseapp.com",
  databaseURL: "https://fulfillments-admin-default-rtdb.firebaseio.com",
  projectId: "fulfillments-admin",
  storageBucket: "fulfillments-admin.appspot.com",
  messagingSenderId: "660625369628",
  appId: "1:660625369628:web:189a4babd2530dd15d0dd9",
});
export const db = getFirestore();
