import React from 'react'

function RemenoScriptureButton({ reference, deleteScripture, viewVerse }) {
  return (
    <div className='scripture-button' onClick={viewVerse}>
        {reference}
        <span onClick={deleteScripture} className="icon"><i className="fas fa-x"></i></span>
    </div>
  )
}

export default RemenoScriptureButton