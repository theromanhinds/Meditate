import React, { useState, useEffect } from 'react';
import NavBar from '../Components/NavBar'
import RemenoScriptureButton from '../Components/RemenoScriptureButton'
import ScriptureSelect from './ScriptureSelect';
import { BooksChaptersVerses } from '../Components/Scriptures';

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
      const bookId = BooksChaptersVerses[selectedBook].index;

      // const response = await fetch(`https://floating-shore-90105-2f5b2c924006.herokuapp.com/api/scripture?bookId=${bookId}&chapter=${selectedChapter}&startingVerse=${selectedStartVerse}&endingVerse=${selectedEndVerse}`);
      const response = await fetch(`https://bolls.life/get-chapter/NIV2011/${bookId}/${selectedChapter}/`)

      const data = await response.json();
      let verse = '';
      let newScripture = null;

      console.log(data);

      if (selectedStartVerse === selectedEndVerse) {
        verse = data[selectedStartVerse-1].text;

        newScripture = {
          reference: `${selectedBook} ${selectedChapter}:${selectedStartVerse}`,
          verse: verse,
    }
      } else {
        for (let i = selectedStartVerse-1; i < selectedEndVerse - 1; i++) {
            verse += data[i].text + " ";
        }
        verse += data[selectedEndVerse-1].text;

        newScripture = {
          reference: `${selectedBook} ${selectedChapter}:${selectedStartVerse}-${selectedEndVerse}`,
          verse: verse,
        }
      }
      // const verse = await response.text();

      // let newScripture = {};

      // if (selectedStartVerse === selectedEndVerse) {
      //   newScripture = {
      //     reference: `${selectedBook} ${selectedChapter}:${selectedStartVerse}`,
      //     verse: verse
      //   }
      // } else {
      //   newScripture = {
      //     reference: `${selectedBook} ${selectedChapter}:${selectedStartVerse}-${selectedEndVerse}`,
      //     verse: verse
      //   }
      // }
      console.log(verse);

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
              <p className='page-header-streak'>{scriptures ? scriptures.length : 0} {scriptures?.length === 1 ? "Verse" : "Verses"}</p>
            </div>
          </div>

        <div className='page-content-inner'>
          <div className='scripture-list'>

              <div className='add-scripture-button' onClick={startSelectingScripture} >
                Add Scripture
                <span className="add-icon"><i className="fas fa-plus"></i></span>
              </div>

              {scriptures.length > 0 ? (
                [...scriptures].reverse().map(scripture => (
                  <RemenoScriptureButton key={scripture.reference} 
                                        reference={scripture.reference} 
                                        viewVerse={() => viewVerse(scripture)}
                                        deleteScripture={(e) => {
                                          e.stopPropagation();
                                          deleteScripture(scripture);
                                        }}/>
                )
                )
                
              ) : (
                <></>
              )}

              <div className='dummy-button'/>

          </div>
        </div>
        
      </div>
      {!selectingScripture && <NavBar setPage={setPage} />}
    </div>}
    </>
    
  )
}

export default Remeno