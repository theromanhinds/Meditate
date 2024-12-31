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
            <button className='add-scripture-button'>
              Add to your list!
              <span className="add-icon"><i className="fas fa-plus"></i></span>
            </button>

            <button className='scripture-button'>
              Gen 1:1
              <span className="icon"><i className="fas fa-ellipsis-vertical"></i></span>
            </button>

            <button className='scripture-button'>
              Gen 1:2
              <span className="icon"><i className="fas fa-ellipsis-vertical"></i></span>
            </button>

            <button className='scripture-button'>
              Gen 1:3
              <span className="icon"><i className="fas fa-ellipsis-vertical"></i></span>
            </button>

            <button className='scripture-button'>
              Gen 1:4
              <span className="icon"><i className="fas fa-ellipsis-vertical"></i></span>
            </button>
            
            <button className='scripture-button'>
              Gen 1:5
              <span className="icon"><i className="fas fa-ellipsis-vertical"></i></span>
            </button>

            <button className='scripture-button'>
              Gen 2:1
              <span className="icon"><i className="fas fa-ellipsis-vertical"></i></span>
            </button>

            <button className='scripture-button'>
              Gen 2:2
              <span className="icon"><i className="fas fa-ellipsis-vertical"></i></span>
            </button>

            <button className='scripture-button'>
              Gen 2:3
              <span className="icon"><i className="fas fa-ellipsis-vertical"></i></span>
            </button>

            <button className='scripture-button'>
              Gen 2:4
              <span className="icon"><i className="fas fa-ellipsis-vertical"></i></span>
            </button>

            <button className='scripture-button'>
              Gen 2:5
              <span className="icon"><i className="fas fa-ellipsis-vertical"></i></span>
            </button>
            
            <button className='scripture-button'>
              Gen 3:1
              <span className="icon"><i className="fas fa-ellipsis-vertical"></i></span>
            </button>

            <button className='scripture-button'>
              Gen 3:2
              <span className="icon"><i className="fas fa-ellipsis-vertical"></i></span>
            </button>

            <button className='scripture-button'>
              Gen 3:3
              <span className="icon"><i className="fas fa-ellipsis-vertical"></i></span>
            </button>

            <button className='scripture-button'>
              Gen 3:4
              <span className="icon"><i className="fas fa-ellipsis-vertical"></i></span>
            </button>
            
            <button className='scripture-button'>
              Gen 3:5
              <span className="icon"><i className="fas fa-ellipsis-vertical"></i></span>
            </button>

            <button className='scripture-button'>
              Gen 4:1
              <span className="icon"><i className="fas fa-ellipsis-vertical"></i></span>
            </button>

            <button className='scripture-button'>
              Gen 4:2
              <span className="icon"><i className="fas fa-ellipsis-vertical"></i></span>
            </button>

            <button className='scripture-button'>
              Gen 4:3
              <span className="icon"><i className="fas fa-ellipsis-vertical"></i></span>
            </button>

            <button className='scripture-button'>
              Gen 4:4
              <span className="icon"><i className="fas fa-ellipsis-vertical"></i></span>
            </button>

          </div>
        </div>
        
      </div>
      <NavBar setPage={setPage} />
    </div>
  )
}

export default Remeno