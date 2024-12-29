import React from 'react'

function NavBar({ setPage }) {
  return (
    <div className='nav-bar'>
        <button onClick={() => setPage('memorize')} className='nav-bar-button'>
            <span className="icon"><i class="fas fa-book-open"></i></span>
        </button>
        <button onClick={() => setPage('meditate')} className='nav-bar-button'>
            <span className="icon"><i className="fas fa-check-circle"></i></span>
        </button>
        <button onClick={() => setPage('account')} className='nav-bar-button'>
            <span className="icon"><i class="fas fa-user"></i></span>
        </button>
    </div>
  )
}

export default NavBar