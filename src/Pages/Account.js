import React from 'react'
import NavBar from '../Components/NavBar'

function Account({ setPage, userData, handleGoogleSignIn, handleSignOut }) {
  return (
    <div className="page-container">
      {userData ? (
        <div className='page-content'> 
          <div className='account-header'>
            <div className='account-image'>{userData.firstName[0]}</div>
            <h1 className='account-username'>{userData.firstName}</h1>
          </div>
          <p className='stats'>Streak: {userData.stats.streak}</p>
          <p className='stats'>Total Memorized: {userData.stats.memorized}</p>
          <button className='sign-in-out' onClick={handleSignOut}>Sign out</button>
        </div>
      ) : (
        <div className='not-signed-in-container'>
          <button className='sign-in-out' onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
      )}

      <NavBar setPage={setPage} />
    </div>
  )
}

export default Account