import React from 'react'
import NavBar from '../Components/NavBar'

function Account({ setPage, userData, handleSignOut, currentStreak, scriptures }) {
  return (
    <div className="page-container">
      
        <div className='page-content'> 
         
          <div className='page-header'>
            <h2 className='page-header-text'>Hi, {userData?.firstName}</h2>
            <div className='streak-widget-container'>
              <p className='page-header-streak'>Your Stats</p>
            </div>
          </div>

          <div className='page-content-inner'>

            <div className='stats-container'>
              <div className='stats-container-inner'>
                <p className='stats-text'>Streak</p>
                <h1 className='stats-number'>{currentStreak}</h1>
              </div>

              <div className='stats-container-inner'>
                <p className='stats-text'>Scriptures</p>
                <h1 className='stats-number'>{scriptures.length}</h1>
              </div>

            </div>

              <button className='sign-out-button' onClick={handleSignOut}>Sign Out</button>

          </div>
          
        </div>

      <NavBar setPage={setPage} />
    </div>
  )
}

export default Account