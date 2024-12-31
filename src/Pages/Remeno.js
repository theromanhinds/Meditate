import React, { useState, useEffect } from 'react';
import NavBar from '../Components/NavBar'
import RemenoScriptureButton from '../Components/RemenoScriptureButton'
import ScriptureSelect from './ScriptureSelect';

import { addScriptureToUser, deleteScriptureFromUser } from '../Components/Firebase'

function Remeno({ setPage, scriptures, setScriptures }) {

  const [selectingScripture, setSelectingScripture] = useState(false)

  useEffect(() => {
    setScriptures(scriptures || []);
  }, [scriptures]);

  const addScripture = async () => {

    setSelectingScripture(true);

    // const newScripture = { reference: "Philippians 4:4", verse: "Rejoice!" };
    // await addScriptureToUser(newScripture);
    // setScriptures((prev) => [...prev, newScripture]);
  };

  const deleteScripture = async (scripture) => {
    await deleteScriptureFromUser(scripture);
    setScriptures((prev) => prev.filter(s => s.reference !== scripture.reference));
  };

  return (
    <>
      {selectingScripture && (
        <ScriptureSelect setSelectingScripture={setSelectingScripture}/>
      )}

      {<div className="page-container">
        <div className='page-content'>

          <div className='page-header'>
            <h2 className='page-header-text'>Remeno</h2>
            <h2 className='page-header-streak'>📜{scriptures ? scriptures.length : 0}</h2>
          </div>

        <div className='page-content-inner'>
          <div className='scripture-list'>

              <button className='add-scripture-button'>
                Add to your list!
                <span onClick={addScripture} className="add-icon"><i className="fas fa-plus"></i></span>
              </button>

              {scriptures.length > 0 ? (
                scriptures.map(scripture => (
                  <RemenoScriptureButton key={scripture.reference} reference={scripture.reference} deleteScripture={() => deleteScripture(scripture)}/>
                ))
              ) : (
                <>No scriptures memorzied.</>
              )}

          </div>
        </div>
        
      </div>
      <NavBar setPage={setPage} />
    </div>}
    </>
    
  )
}

export default Remeno