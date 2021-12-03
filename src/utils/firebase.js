import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "fulfillments-admin.firebaseapp.com",
  databaseURL: "https://fulfillments-admin-default-rtdb.firebaseio.com",
  projectId: "fulfillments-admin",
  storageBucket: "fulfillments-admin.appspot.com",
  messagingSenderId: "660625369628",
  appId: "1:660625369628:web:189a4babd2530dd15d0dd9",
};
initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const analytics = getAnalytics();
