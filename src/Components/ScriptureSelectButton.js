import React from 'react'

function ScriptureSelectButton({ text, nextSelectStage }) {

    const selectText = () => {
        console.log("selecting " + text);
        nextSelectStage();
    }

  return (
    <button className='scripture-button' onClick={selectText} >
        {text}
        <span className="icon"><i className="fas fa-angle-right"></i></span>
    </button>
  )
}

export default ScriptureSelectButton