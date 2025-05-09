import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBuv2OvcVPlZrGZR9ChoGkn6i9ajyYZUbg",
    authDomain: "contact-form-ar.firebaseapp.com",
    projectId: "contact-form-ar",
    storageBucket: "contact-form-ar.firebasestorage.app",
    messagingSenderId: "678686490833",
    appId: "1:678686490833:web:5d6c4a92bdc9bce131c5f0"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  export { db };