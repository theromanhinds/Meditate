import React from 'react'

const styles = {
    navBar: {
        
    },
    
};

function NavBar({ setPage }) {
  return (
    <div className='nav-bar'>
        <button onClick={() => setPage('memorize')} className='nav-bar-button'>memorize</button>
        <button onClick={() => setPage('meditate')} className='nav-bar-button'>meditate</button>
        <button onClick={() => setPage('account')} className='nav-bar-button'>account</button>
    </div>
  )
}

export default NavBar