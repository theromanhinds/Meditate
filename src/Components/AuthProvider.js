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
  }, [setUserData]);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
  
      if (!docSnap.exists()) {
        // Initialize new user data
        const fullName = user.displayName;
        const firstName = fullName.split(' ')[0];
  
        await setDoc(docRef, {
          createdAt: new Date(),
          email: user.email,
          firstName: firstName,
          fullName: user.displayName,
          dailyMenoCompleted: false,
          scriptures: [
            {
              reference: "Genesis 1:1",
              verse: "In the beginning, God created the heavens and the earth."
            },
            {
              reference: "John 3:16",
              verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
            }
          ],
          stats: {
            streak: 0,
            memorized: 0
          }
        });
      } else {
        // Load existing user data
        setUserData(docSnap.data());
      }
      console.log("SIGNED IN!");
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
