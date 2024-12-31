import React from 'react'

function VerseViewer({ scripture }) {
  return (
    <div className='verse-viewer-container' onClick={(e) => e.stopPropagation()}>
        <div className='verse-handle-bar'></div>
        <h3 className='verse-reference'>{scripture.reference}</h3>
        <p className='verse-text'>{ scripture.verse }</p>
    </div>
  )
}

export default VerseViewer