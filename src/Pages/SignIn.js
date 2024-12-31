import React from 'react'

function SignIn({ handleGoogleSignIn }) {
  return (
    <div className='page-container'> 
        <div className='page-content-inner'>
            
            <p className='sign-in-welcome'>Welcome to </p>
            <h1 className='sign-in-logo'>Meno</h1>
            <p className='sign-in-tagline'>Remain in the Vine 🌿</p>
            <button className='sign-in-button' onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
    </div>
  )
}

export default SignIn