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
    
    // if (selectedStartVerse === selectedEndVerse) {

    //   let query = encodeURIComponent(`${selectedBook} ${selectedChapter}:${selectedStartVerse}`);
    //   const url = `http://localhost:5000/api/verse?search=${query}&version=NIV`;

    //   const response = await fetch(url);
    //   const data = await response.json();
    //   console.log(data);

    //   // Assuming data.verseData contains the HTML content
    //   const parser = new DOMParser();
    //   const doc = parser.parseFromString(data.verseData, 'text/html');

    //   const span = doc.querySelector('.std-text p span');
    
    //   // Remove all <span> elements, but preserve the one with the 'small-caps' class
    //   const cleanText = span.innerHTML
    //     .replace(/<sup.*?>.*?<\/sup>/g, '') // Remove <sup> elements
    //     .replace(/<span(?!.*class="small-caps")[^>]*>.*?<\/span>/g, ''); // Remove all <span> except 'small-caps'
    
    //   // Use the cleaned HTML to extract the text
    //   const text = new DOMParser().parseFromString(cleanText, 'text/html').body.textContent;
    
    //   // Remove leading chapter number and any extra spaces
    //   const cleaned = text.replace(/^\d+\s+/, '').trim();
    
    //   console.log(cleaned);  // Now it should output the cleaned text correctly

    //   addScripture({
    //     reference: `${selectedBook} ${selectedChapter}:${selectedStartVerse}`,
    //     verse: cleaned
    //   })
      
    // } else {

    //   let query = encodeURIComponent(`${selectedBook} ${selectedChapter}:${selectedStartVerse}-${selectedEndVerse}`);
    //   const url = `http://localhost:5000/api/verse?search=${query}&version=NIV`;
    //   const response = await fetch(url);
    //   const data = await response.json();

    //   const parser = new DOMParser();
    //   const doc = parser.parseFromString(data.verseData, 'text/html');

    //   // Get all spans inside the <p> element containing the verses
    //   const spans = doc.querySelectorAll('.std-text p span');
      
    //   let verseText = '';

    //   spans.forEach(span => {
    //     // Remove unwanted <span> elements and <sup> elements
    //     let cleanedText = span.innerHTML
    //       .replace(/<sup.*?>.*?<\/sup>/g, '') // Remove <sup> elements
    //       .replace(/<span(?!.*class="small-caps")[^>]*>.*?<\/span>/g, ''); // Remove unwanted <span>
        
    //     // Remove leading numbers and extra spaces
    //     cleanedText = cleanedText.replace(/^\d+\s*/, '').replace(/\s{2,}/g, ' ').trim(); // Fix extra spaces
        
    //     // Parse the cleaned HTML and extract the text
    //     const cleanedVerse = new DOMParser().parseFromString(cleanedText, 'text/html').body.textContent;
        
    //     // Add cleaned verse to the final text with a space between verses
    //     verseText += cleanedVerse + ' ';
    //   });
      
    //   const cleaned = verseText.trim();
    //   console.log(verseText.trim());

    //   addScripture({
    //     reference: `${selectedBook} ${selectedChapter}:${selectedStartVerse}-${selectedEndVerse}`,
    //     verse: cleaned
    //   })
    // }

    // const response = await fetch('http://localhost:5000/verse?query=John%203:16-18&version=NIV');
    // const data = await response.json();

    // const parser = new DOMParser();
    // const doc = parser.parseFromString(data.verseData, 'text/html');

    // // Get all spans inside the <p> element containing the verses
    // const spans = doc.querySelectorAll('.std-text p span');
    
    // let verseText = '';

    // spans.forEach(span => {
    //   // Remove any <sup> tags inside the span
    //   const cleanText = span.innerHTML.replace(/<sup.*?>.*?<\/sup>/g, '').trim();
    //   verseText += cleanText + ' ';
    // });

    // console.log(verseText.trim());
    
    try {
      const bookId = BooksChaptersVerses[selectedBook].index;

      const response = await fetch(`http://localhost:5000/api/scripture?bookId=${bookId}&chapter=${selectedChapter}&startingVerse=${selectedStartVerse}&endingVerse=${selectedEndVerse}`);
      const verse = await response.text();

      let newScripture = {};

      if (selectedStartVerse === selectedEndVerse) {
        newScripture = {
          reference: `${selectedBook} ${selectedChapter}:${selectedStartVerse}`,
          verse: verse
        }
      } else {
        newScripture = {
          reference: `${selectedBook} ${selectedChapter}:${selectedStartVerse}-${selectedEndVerse}`,
          verse: verse
        }
      }
      
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
                                        deleteScripture={(e) => {
                                          e.stopPropagation();
                                          deleteScripture(scripture);
                                        }}/>
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