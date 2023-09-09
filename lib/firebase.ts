import firebase from "firebase/app";
import "firebase/storage";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyByGpeqUu12fXpSEGkyDdTPpeKmwSPKihs",
  authDomain: "ecommerce-kicks-dashboar-7a65c.firebaseapp.com",
  projectId: "ecommerce-kicks-dashboar-7a65c",
  storageBucket: "ecommerce-kicks-dashboar-7a65c.appspot.com",
  messagingSenderId: "996134878515",
  appId: "1:996134878515:web:095e51aed098c8af4f5246",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
