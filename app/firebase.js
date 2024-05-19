import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAUszO8BaX3Bu7MToB-lw4BoWAl6-ufzYU",
  authDomain: "expense-tracker-81e0f.firebaseapp.com",
  projectId: "expense-tracker-81e0f",
  storageBucket: "expense-tracker-81e0f.appspot.com",
  messagingSenderId: "765521589375",
  appId: "1:765521589375:web:6138d7b835bae2591e7b4a",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
