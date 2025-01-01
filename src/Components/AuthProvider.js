import { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './Firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Custom hook for managing authentication state
export const useAuth = () => {
  const [userData, setUserData] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const docRef = doc(db, 'users', user.uid);
  //       const docSnap = await getDoc(docRef);
        
  //       if (docSnap.exists()) {
  //         setUserData(docSnap.data());
  //       } else {
  //         console.log('No such document!');
  //       }
  //     } else {
  //       setUserData(null); // Reset userData when no user is signed in
  //     }
  //     setAuthLoading(false);  // Stop loading once auth state is determined
  //   });

  //   return () => unsubscribe();
  // }, []);

  // const handleGoogleSignIn = async () => {
  //   const provider = new GoogleAuthProvider();
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;
  //     const userId = user.uid;
      
  //     const docRef = doc(db, 'users', user.uid);
  //     const docSnap = await getDoc(docRef);
  
  //     if (!docSnap.exists()) {
  //       // Initialize new user data
  //       const fullName = user.displayName;
  //       const firstName = fullName.split(' ')[0];
  
  //       await setDoc(docRef, {
  //         userId: userId,
  //         createdAt: new Date(),
  //         email: user.email,
  //         firstName: firstName,
  //         fullName: user.displayName,
  //         dailyMenoCompleted: false,
  //         scriptures: [
  //           {
  //             reference: "Genesis 1:1",
  //             verse: "In the beginning, God created the heavens and the earth."
  //           },
  //           {
  //             reference: "John 3:16",
  //             verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
  //           }
  //         ],
  //         stats: {
  //           streak: 0,
  //           memorized: 0
  //         }
  //       });
  //     } else {
  //       // Load existing user data
  //       setUserData(docSnap.data());
  //     }
  //     console.log("SIGNED IN!");
  //   } catch (error) {
  //     console.error('Error signing in: ', error);
  //   }
  // };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          // If user document exists, update state with user data
          setUserData(docSnap.data());
        } else {
          // Create new user document if it doesn't exist
          console.log('Creating new user document for: ', user.uid);
          
          // Create the user's document with initial data
          await setDoc(docRef, {
            userId: user.uid,
            createdAt: new Date(),
            email: user.email,
            firstName: user.displayName.split(' ')[0],
            fullName: user.displayName,
            dailyMenoCompleted: false,
            scriptures: [
              { reference: "Genesis 1:1", verse: "In the beginning, God created the heavens and the earth." },
              { reference: "John 3:16", verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." }
            ],
            stats: { streak: 0, memorized: 0 }
          });
          
          // After creating, set the userData to initialize the state
          setUserData({
            userId: user.uid,
            createdAt: new Date(),
            email: user.email,
            firstName: user.displayName.split(' ')[0],
            fullName: user.displayName,
            dailyMenoCompleted: false,
            scriptures: [
              { reference: "Genesis 1:1", verse: "In the beginning, God created the heavens and the earth." },
              { reference: "John 3:16", verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." }
            ],
            stats: { streak: 0, memorized: 0 }
          });
        }
      } else {
        setUserData(null);  // Reset userData if no user is signed in
      }
      setAuthLoading(false);  // Stop loading once auth state is determined
    });
  
    return () => unsubscribe();
  }, []);
  
  const handleGoogleSignIn = async () => {
    setAuthLoading(true);  // Set loading state to true when sign-in begins
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
  
      if (!docSnap.exists()) {
        // User does not exist, Firestore document creation will be handled in useEffect
        console.log('New user detected. Document will be created after auth state changes.');
      } else {
        // Existing user, pass the data to the state here
        setUserData(docSnap.data());
      }
      console.log("SIGNED IN!");
    } catch (error) {
      console.error('Error signing in: ', error);
    } finally {
      setAuthLoading(false);  // Reset loading state after sign-in process is complete
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
