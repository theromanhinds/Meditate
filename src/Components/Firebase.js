import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const addScriptureToUser = async (scripture) => {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User not authenticated");

  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    scriptures: arrayUnion(scripture)
  });
};

export const deleteScriptureFromUser = async (scripture) => {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User not authenticated");

  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    scriptures: arrayRemove(scripture)
  });
};

export const updateStreak = async (newStreakValue) => {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User not authenticated");
  
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      "stats.streak": newStreakValue,
    });
    console.log("Streak updated successfully!");
  } catch (error) {
    console.error("Error updating streak:", error);
  }
};