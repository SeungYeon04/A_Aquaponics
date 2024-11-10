// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCuhKgX31oFyjrzVhWgMpogNn5DVghSRSk",
  authDomain: "aquaponicsweb.firebaseapp.com",
  projectId: "aquaponicsweb",
  storageBucket: "aquaponicsweb.firebasestorage.app",
  messagingSenderId: "122176669443",
  appId: "1:122176669443:web:aeedb0c7d07354904f0b36",
  measurementId: "G-RJ3S19TMKE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
