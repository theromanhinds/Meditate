import './App.css';
import React, { useState, useEffect } from 'react';

import Home from './Pages/Home';
import Remeno from './Pages/Remeno';
import Account from './Pages/Account';

import { useAuth } from './Components/AuthProvider';

function App() {

  const { userData, handleGoogleSignIn, handleSignOut } = useAuth();  // Use the custom hook

  const [currentPage, setCurrentPage] = useState('home');

  const [scriptures, setScriptures] = useState(userData?.scriptures || []);

  const [currentStreak, setCurrentStreak] = useState(userData?.stats.streak || 0);
  
  useEffect(() => {
    if (userData) {
      setScriptures(userData?.scriptures || []);
      setCurrentStreak(userData?.stats?.streak || 0);
    }
  }, [userData]);

  const [dailyMenoScripture, setDailyMenoScripture] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'remeno':
        return <Remeno setPage={(page) => handlePageChange(page)} scriptures={scriptures} setScriptures={setScriptures}/>;
      case 'account':
        return <Account setPage={(page) => handlePageChange(page)} userData={userData} handleGoogleSignIn={handleGoogleSignIn} handleSignOut={handleSignOut} />;
      default:
        return <Home setPage={(page) => handlePageChange(page)} 
                      scriptures={scriptures} 
                      dailyMenoScripture={dailyMenoScripture} 
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
    <div className="App">
        {renderPage()}
    </div>
  );
}

export default App;
