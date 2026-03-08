import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace below with your actual config from Firebase

const firebaseConfig = {
  apiKey: "AIzaSyCCqlntIt0YFoU-V1Ta72eAI_YUfoaRt9A",
  authDomain: "socialconnect-7235f.firebaseapp.com",
  projectId: "socialconnect-7235f",
  storageBucket: "socialconnect-7235f.firebasestorage.app",
  messagingSenderId: "761040354984",
  appId: "1:761040354984:web:a4729e43b0db64f2f78c9d",
  measurementId: "G-397CZ9BHYN"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);