import './App.css';
import React, { useState } from 'react';

import { scriptures } from './Components/Scriptures';

import Meditate from './Menus/Meditate';
import Memorize from './Menus/Memorize';
import Account from './Menus/Account';
import NavBar from './Components/NavBar';

import { useAuth } from './Components/AuthProvider';

function App() {
  const { userData, handleGoogleSignIn, handleSignOut } = useAuth();  // Use the custom hook

  const [currentPage, setCurrentPage] = useState('meditate');
  const [transitioning, setTransitioning] = useState(false);  // Track transition state

  const [phase, setPhase] = useState(1);  // Track the current phase

  const renderPage = () => {
    switch (currentPage) {
      case 'memorize':
        return <Memorize />;
      case 'account':
        return <Account userData={userData} handleGoogleSignIn={handleGoogleSignIn} handleSignOut={handleSignOut} />;
      default:
        return <Meditate scriptures={scriptures} phase={phase} setPhase={setPhase} />;
    }
  };

  const handlePageChange = (newPage) => {
    setTransitioning(true);  // Start the transition

    setTimeout(() => {
      setCurrentPage(newPage);  // Change the page after the transition
      setTransitioning(false);  // End the transition
    }, 300);  // The duration of the dip-to-black transition (matches the CSS transition)
  };

  return (
    <div className="App">
      <div className={`screen-transition ${transitioning ? 'transition-active' : ''}`} />
      {renderPage()}
      {phase === 1 && <NavBar setPage={(page) => handlePageChange(page)} />}  {/* Conditionally render NavBar */}
    </div>
  );
}

export default App;
