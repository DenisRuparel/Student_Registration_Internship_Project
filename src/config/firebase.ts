import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBp0hRxQJdIFiEz_rVT3fq-eDTwhfu4a1E",
  authDomain: "studentregister-1b164.firebaseapp.com",
  projectId: "studentregister-1b164",
  storageBucket: "studentregister-1b164.firebasestorage.app",
  messagingSenderId: "476134543020",
  appId: "1:476134543020:web:e555b62e58d189ac709909"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app; 