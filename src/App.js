import './App.css';
import React, { useState } from 'react';

import { scriptures } from './Components/Scriptures';

import DailyMeno from './Pages/DailyMeno';
import Remeno from './Pages/Remeno';
import Account from './Pages/Account';
import NavBar from './Components/NavBar';

import { useAuth } from './Components/AuthProvider';

function App() {
  const { userData, handleGoogleSignIn, handleSignOut } = useAuth();  // Use the custom hook

  const [currentPage, setCurrentPage] = useState('daily-meno');
  // const [transitioning, setTransitioning] = useState(false);  // Track transition state

  const renderPage = () => {
    switch (currentPage) {
      case 'remeno':
        return <Remeno setPage={(page) => handlePageChange(page)} userData={userData} />;
      case 'account':
        return <Account setPage={(page) => handlePageChange(page)} userData={userData} handleGoogleSignIn={handleGoogleSignIn} handleSignOut={handleSignOut} />;
      default:
        return <DailyMeno setPage={(page) => handlePageChange(page)} scriptures={scriptures} userData={userData}/>;
    }
  };

  const handlePageChange = (newPage) => {

    setCurrentPage(newPage);

    // setTransitioning(true);  // Start the transition
    // setTimeout(() => {
    //   setCurrentPage(newPage);  
    //   setTransitioning(false);  
    // }, 300);  

  };

  return (
    <div className="App">
      {/* <div className={`screen-transition ${transitioning ? 'transition-active' : ''}`} /> */}
        {renderPage()}
    </div>
  );
}

export default App;
