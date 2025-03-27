import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD7c54s5jdfngmhQKKZJ2jqBbVvPNcEHNE",
  authDomain: "ai-resume-builder-f7cf1.firebaseapp.com",
  projectId: "ai-resume-builder-f7cf1",
  storageBucket: "ai-resume-builder-f7cf1.firebasestorage.app",
  messagingSenderId: "312415417217",
  appId: "1:312415417217:web:476da9d5fd66d2aaea2e80"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
