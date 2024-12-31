import './App.css';
import React, { useState } from 'react';

import Home from './Pages/Home';
import Remeno from './Pages/Remeno';
import Account from './Pages/Account';

import { useAuth } from './Components/AuthProvider';

function App() {

  const { userData, handleGoogleSignIn, handleSignOut } = useAuth();  // Use the custom hook

  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'remeno':
        return <Remeno setPage={(page) => handlePageChange(page)} userData={userData} />;
      case 'account':
        return <Account setPage={(page) => handlePageChange(page)} userData={userData} handleGoogleSignIn={handleGoogleSignIn} handleSignOut={handleSignOut} />;
      default:
        return <Home setPage={(page) => handlePageChange(page)} userData={userData}/>;
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
