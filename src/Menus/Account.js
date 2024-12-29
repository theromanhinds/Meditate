import React from 'react'

function Account({userData, handleGoogleSignIn, handleSignOut}) {
  return (
    <div className="main-container">
      Account
      {userData ? (
        <>
          <h1>Welcome, {userData.firstName}</h1>
          <button onClick={handleSignOut}>Sign out</button>
        </>
      ) : (
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      )}
    </div>
  )
}

export default Account