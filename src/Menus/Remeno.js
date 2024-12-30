import React from 'react'
import NavBar from '../Components/NavBar'

function Remeno({ setPage, userData }) {
  return (
    <div className="page-container">
      <div className='page-content'>

        <div className='page-header'>
          <h2 className='page-header-text'>Remeno</h2>
          <h2 className='page-header-streak'>📜{userData ? userData.stats.memorized : 0}</h2>
        </div>

        <div className='page-content-inner'>
          <div className='scripture-list'>
            <button className='add-scripture-button'>Add to your list!</button>
            <p className='scripture-button'>Gen 1:1</p>
            <p className='scripture-button'>Rom 1:1</p>
            <p className='scripture-button'>Pet 1:1</p>
            <p className='scripture-button'>Jam 1:1</p>
            <p className='scripture-button'>Gen 1:1</p>
            <p className='scripture-button'>Gen 1:1</p>
            <p className='scripture-button'>Gen 1:1</p>
            <p className='scripture-button'>Gen 1:1</p>
            <p className='scripture-button'>Gen 1:1</p>
            <p className='scripture-button'>Gen 1:1</p>
            <p className='scripture-button'>Gen 1:1</p>
            <p className='scripture-button'>Gen 1:1</p>
            <p className='scripture-button'>Gen 1:1</p>
            <p className='scripture-button'>Gen 1:1</p>
            <p className='scripture-button'>Gen 1:1</p>
            <p className='scripture-button'>Gen 1:1</p>
            <p className='scripture-button'>Gen 1:1</p>
            <p className='scripture-button'>Gen 1:1</p>
            <p className='scripture-button'>Gen 1:1</p>
            <p className='scripture-button'>Gen 1:1</p>
          </div>
        </div>
        
      </div>
      <NavBar setPage={setPage} />
    </div>
  )
}

export default Remeno