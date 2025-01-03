import './App.css';
import React, { useState, useEffect } from 'react';

import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import Remeno from './Pages/Remeno';
import Account from './Pages/Account';

import { useAuth } from './Components/AuthProvider';

function App() {

  const { userData, authLoading, handleGoogleSignIn, handleSignOut } = useAuth();  // Use the custom hook

  const [currentPage, setCurrentPage] = useState('home');

  const [scriptures, setScriptures] = useState(userData?.scriptures || []);

  const [currentStreak, setCurrentStreak] = useState(userData?.stats.streak || 0);

  const [canAddScripture, setCanAddScripture] = useState(false);
  
  const [dailyMenoScripture, setDailyMenoScripture] = useState(null);
  const [menoActivated, setMenoActivated] = useState(false);
  const [menoCompleted, setMenoCompleted] = useState(true);

  useEffect(() => {
    if (userData) {
      setScriptures(userData?.scriptures || []);
      setCurrentStreak(userData?.stats?.streak || 0);

      const checkIfNewDay = () => {
        const lastScriptureAdded = userData.lastScriptureAdded;
        const lastMenoCompleted = userData.lastMenoCompleted;

        const today = new Date().toISOString().split('T')[0];  // YYYY-MM-DD
      
        if (lastScriptureAdded !== today) {
          setCanAddScripture(true);  // Allow adding scripture
        } else {
          setCanAddScripture(false);  // Block adding scripture
        }

        if (lastMenoCompleted === today) {
          setDailyMenoScripture(userData.dailyMenoScripture);
          setTimeout(() => {
            setMenoCompleted(true);
        }, 0); 
        } else {
          setMenoCompleted(false);  // Allow daily meno
        }

      };

      checkIfNewDay();

    }
  }, [userData, dailyMenoScripture]);

  const renderPage = () => {
    switch (currentPage) {
      case 'remeno':
        return <Remeno setPage={(page) => handlePageChange(page)} 
                        userData={userData} 
                        scriptures={scriptures} 
                        setScriptures={setScriptures}
                        canAddScripture={canAddScripture}
                        setCanAddScripture={setCanAddScripture}/>;
      case 'account':
        return <Account setPage={(page) => handlePageChange(page)} 
                        currentStreak={currentStreak}
                        scriptures={scriptures}
                        userData={userData} 
                        handleGoogleSignIn={handleGoogleSignIn} 
                        handleSignOut={handleSignOut} />;
      default:
        return <Home setPage={(page) => handlePageChange(page)} 
                      scriptures={scriptures} 
                      dailyMenoScripture={dailyMenoScripture}
                      menoActivated={menoActivated}
                      setMenoActivated={setMenoActivated}
                      menoCompleted={menoCompleted} 
                      setMenoCompleted={setMenoCompleted}
                      setDailyMenoScripture={setDailyMenoScripture} 
                      userData={userData}
                      currentStreak={currentStreak}
                      setCurrentStreak={setCurrentStreak}/>;
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    // <div className="App">
    //     (userData ? renderPage() : <SignIn handleGoogleSignIn={handleGoogleSignIn}/>)
    // </div>

    <div className="App">
    {authLoading ? (
      <div className="spinner"></div>  
    ) : userData ? (
      renderPage()
    ) : (
      <SignIn handleGoogleSignIn={handleGoogleSignIn} />
    )}
  </div>
  );
}

export default App;
