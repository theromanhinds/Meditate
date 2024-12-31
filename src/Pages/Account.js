import React from 'react'
import NavBar from '../Components/NavBar'

function Account({ setPage, userData, handleGoogleSignIn, handleSignOut }) {
  return (
    <div className="page-container">
      {userData ? (
        <div className='page-content'> 
         
          <div className='page-header'>
            <h2 className='page-header-text'>Hi, {userData.firstName}</h2>
          </div>

          <div className='page-content-inner'>
            <div className='scripture-list'>

              <p className='account-stats'>Streak: {userData.stats.streak}</p>
              <p className='account-stats'>Total Memorized: {userData.stats.memorized}</p>
            
              <button className='sign-out-button' onClick={handleSignOut}>Sign Out</button>

            </div>
          </div>
          
        </div>
      ) : (
        <div className='page-content'> 

          <div className='page-content-inner'>
            
              <button className='sign-in-button' onClick={handleGoogleSignIn}>Sign in with Google</button>

          </div>

        </div>
      )}

      <NavBar setPage={setPage} />
    </div>
  )
}

export default Account