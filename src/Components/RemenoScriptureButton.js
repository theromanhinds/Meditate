import React from 'react'

function RemenoScriptureButton({ reference, deleteScripture }) {
  return (
    <button className='scripture-button'>
        {reference}
        <span onClick={deleteScripture} className="icon"><i className="fas fa-ellipsis-vertical"></i></span>
    </button>
  )
}

export default RemenoScriptureButton