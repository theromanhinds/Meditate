import React from 'react'

function ScriptureSelectButton({ text, nextSelectStage }) {

    const selectBook = () => {
        console.log("selecting " + text);
        nextSelectStage();
    }

  return (
    <button className='scripture-button'>
        {text}
        <span onClick={selectBook} className="icon"><i className="fas fa-angle-right"></i></span>
    </button>
  )
}

export default ScriptureSelectButton