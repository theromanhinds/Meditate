import { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './Firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Custom hook for managing authentication state
export const useAuth = () => {
  const [userData, setUserData] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } else {
        setUserData(null); // Reset userData when no user is signed in
      }
      setAuthLoading(false);  // Stop loading once auth state is determined
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const fullName = user.displayName;
      const firstName = fullName.split(' ')[0];

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        fullName: user.displayName,
        firstName: firstName,
        createdAt: new Date(),
        stats: {
          gamesPlayed: 0,
          highScore: 0,
        }
      }, { merge: true });
    } catch (error) {
      console.error('Error signing in: ', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      setUserData(null); // Reset the user data on sign-out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    userData,
    authLoading,
    handleGoogleSignIn,
    handleSignOut
  };
};
