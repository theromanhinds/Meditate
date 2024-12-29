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

  const renderPage = () => {
    switch (currentPage) {
      case 'memorize':
        return <Memorize />;
      case 'account':
        return <Account userData={userData} handleGoogleSignIn={handleGoogleSignIn} handleSignOut={handleSignOut} />;
      default:
        return <Meditate scriptures={scriptures} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
      <NavBar setPage={setCurrentPage} />
    </div>
  );
}

export default App;
