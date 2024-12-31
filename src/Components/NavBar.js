import React from 'react'

function NavBar({ setPage }) {
  return (
    <div className='nav-bar'>
        <button onClick={() => setPage('remeno')} className='nav-bar-button'>
            <span className="nav-icon"><i className="far fa-bookmark"></i></span>
        </button>
        <button onClick={() => setPage('home')} className='nav-bar-button'>
            <span className="nav-icon"><i className="far fa-check-circle"></i></span>
        </button>
        <button onClick={() => setPage('account')} className='nav-bar-button'>
            <span className="nav-icon"><i className="far fa-user"></i></span>
        </button>
    </div>
  )
}

export default NavBar