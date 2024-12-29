import React from 'react'

function Account({userData, handleGoogleSignIn, handleSignOut}) {
  return (
    <div className="account-container">
      {userData ? (
        <> 
          <div className='account-header'>
            <div className='account-image'>{userData.firstName[0]}</div>
            <h1 className='account-username'>{userData.firstName}</h1>
          </div>
          <p className='stats'>Streak: {userData.stats.streak}</p>
          <p className='stats'>Total Memorized: {userData.stats.memorized}</p>
          <button className='sign-in-out' onClick={handleSignOut}>Sign out</button>
        </>
      ) : (
        <div className='not-signed-in-container'>
          <button className='sign-in-out' onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
      )}
    </div>
  )
}

export default Account