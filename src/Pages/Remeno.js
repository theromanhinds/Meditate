import React, { useState, useEffect } from 'react';
import NavBar from '../Components/NavBar'
import RemenoScriptureButton from '../Components/RemenoScriptureButton'
import ScriptureSelect from './ScriptureSelect';

import { addScriptureToUser, deleteScriptureFromUser } from '../Components/Firebase'
import VerseViewer from './VerseViewer';

function Remeno({ setPage, scriptures, setScriptures }) {

  const [selectingScripture, setSelectingScripture] = useState(false);
  const [scriptureToView, setScriptureToView] = useState(null);
  const [viewingVerse, setViewingVerse] = useState(false);

  useEffect(() => {
    setScriptures(scriptures || []);
  }, [scriptures, setScriptures]);

  const requestScripture = async (selectedBook, selectedChapter, selectedStartVerse, selectedEndVerse) => {
    try {
      const verseRange = `${selectedBook.toLowerCase()}+${selectedChapter}:${selectedStartVerse}-${selectedEndVerse}`;
      const response = await fetch(`https://bible-api.com/${verseRange}`);
      const data = await response.json();
      const newScripture = {
        reference: data.reference,
        verse: data.text
      }
      console.log(newScripture);
      addScripture(newScripture);
    } catch (error) {
      console.error('Error fetching scripture:', error);
    }
  }

  const startSelectingScripture = async () => {
    setSelectingScripture(true);
  };

  const addScripture = async (newScripture) => {
    await addScriptureToUser(newScripture);
    setScriptures((prev) => [...prev, newScripture]);
  };

  const deleteScripture = async (scripture) => {
    await deleteScriptureFromUser(scripture);
    setScriptures((prev) => prev.filter(s => s.reference !== scripture.reference));
  };

  const viewVerse = (scripture) => {
    setScriptureToView(scripture);
    setViewingVerse(true);
  }

  const closeViewingVerse = () => {
    setViewingVerse(false);
    setScriptureToView(null);
  }

  return (
    <>
      {selectingScripture && (
        <ScriptureSelect setSelectingScripture={setSelectingScripture}
                          requestScripture={requestScripture}/>
      )}

      {viewingVerse && (
        <div className='verse-viewer-overlay' onClick={closeViewingVerse}>
          <VerseViewer scripture={scriptureToView}/>
        </div>
      )}

      {<div className="page-container">
        <div className='page-content'>

          <div className='page-header'>
            <h2 className='page-header-text'>Scriptures</h2>
            <div className='streak-widget-container'>
              <p className='page-header-streak'>{scriptures ? scriptures.length : 0} {scriptures?.length > 1 ? "Verses" : "Verse"}</p>
            </div>
          </div>

        <div className='page-content-inner'>
          <div className='scripture-list'>

              <button className='add-scripture-button' onClick={startSelectingScripture} >
                Add Scripture
                <span className="add-icon"><i className="fas fa-plus"></i></span>
              </button>

              {scriptures.length > 0 ? (
                [...scriptures].reverse().map(scripture => (
                  <RemenoScriptureButton key={scripture.reference} 
                                        reference={scripture.reference} 
                                        viewVerse={() => viewVerse(scripture)}
                                        deleteScripture={() => deleteScripture(scripture)}/>
                ))
              ) : (
                <div className='add-scripture-button'>No scriptures memorzied.</div>
              )}

          </div>
        </div>
        
      </div>
      {!selectingScripture && <NavBar setPage={setPage} />}
    </div>}
    </>
    
  )
}

export default Remeno