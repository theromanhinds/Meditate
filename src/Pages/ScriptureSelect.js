import React, { useState, useEffect } from 'react'
import { BooksChaptersVerses } from '../Components/Scriptures';
import ScriptureSelectButton from '../Components/ScriptureSelectButton';

function ScriptureSelect({ setSelectingScripture, requestScripture }) {

    const [selectStage, setSelectStage] = useState(1);
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedStartVerse, setSelectedStartVerse] = useState(null);
    const [selectedEndVerse, setSelectedEndVerse] = useState(null);

    const backButton = () => {
        setSelectingScripture(false);
    }

    const nextSelectStage = () => {
        setSelectStage((prevStage) => prevStage + 1);
    }

    const backToBookSelect = () => {
        setSelectStage(1);
        setSelectedBook(null);
    }

    const backToChapterSelect = () => {
        setSelectStage(2);
        setSelectedChapter(null);
    }

    const backToStartVerseSelect = () => {
        setSelectStage(3);
        setSelectedStartVerse(null);
    }

    useEffect(() => {
        if (selectStage === 5 && selectedEndVerse !== null) {
          requestScripture(selectedBook, selectedChapter, selectedStartVerse, selectedEndVerse);
          setSelectingScripture(false); // or any other finalization action
        }
      }, [selectStage, selectedEndVerse, selectedBook, selectedChapter, selectedStartVerse, requestScripture, setSelectingScripture]);

  return (
        <>
            {selectStage === 1 && (
                <div className="scripture-select-container">

                        <div className='scripture-select-header'>
                            
                            <span onClick={backButton} className="icon"><i className="fas fa-angle-left"></i></span>

                            <h2 className='scripture-select-header-text'>Select Book</h2>

                        </div>

                        <div className='page-content-inner'>
                            <div className='scripture-list'>

                                {Object.keys(BooksChaptersVerses).length > 0 ? (
                                    Object.keys(BooksChaptersVerses).map(book => (
                                        <ScriptureSelectButton 
                                            key={book} text={book} 
                                            nextSelectStage={() => {
                                                setSelectedBook(book);
                                                nextSelectStage();
                                            }}
                                        />
                                    ))
                                ) : (
                                    <>No books available.</>
                                )}

                            </div>
                        </div>

                </div>
            )}

            {selectStage === 2 && (
                <div className="scripture-select-container">

                        <div className='scripture-select-header'>
                            
                            <span onClick={backToBookSelect} className="icon"><i className="fas fa-angle-left"></i></span>

                            <h2 className='scripture-select-header-text'>{selectedBook}</h2>

                        </div>

                        <div className='page-content-inner'>
                            <div className='scripture-list'>
                                {selectedBook && BooksChaptersVerses[selectedBook] ? (
                                    Array.from({ length: BooksChaptersVerses[selectedBook].chapters }).map((_, index) => (
                                        <ScriptureSelectButton 
                                            key={index + 1} 
                                            text={`${index + 1}`}
                                            nextSelectStage={() => {
                                                setSelectedChapter(index + 1);
                                                nextSelectStage();
                                            }}
                                        />
                                    ))
                                ) : (
                                    <>No chapters available.</>
                                )}
                            </div>
                        </div>

                </div>
            )}

            {selectStage === 3 && (
                <div className="scripture-select-container">

                        <div className='scripture-select-header'>
                            
                            <span onClick={backToChapterSelect} className="icon"><i className="fas fa-angle-left"></i></span>

                            <h2 className='scripture-select-header-text'>{selectedBook} {selectedChapter}</h2>

                        </div>

                        <div className='page-content-inner'>
                            <div className='scripture-list'>
                            {selectedBook && selectedChapter && BooksChaptersVerses[selectedBook] ? (
                                Array.from({ length: BooksChaptersVerses[selectedBook].verses[selectedChapter - 1] }).map((_, index) => (
                                    <ScriptureSelectButton 
                                        key={index + 1} 
                                        text={`${index + 1}`}
                                        nextSelectStage={() => {
                                            setSelectedStartVerse(index + 1);
                                            nextSelectStage();
                                        }}
                                    />
                                ))
                            ) : (
                                <>No verses available.</>
                            )}
                            </div>
                        </div>

                </div>
            )}

            {selectStage === 4 && (
                <div className="scripture-select-container">

                    <div className='scripture-select-header'>
                        
                        <span onClick={backToStartVerseSelect} className="icon"><i className="fas fa-angle-left"></i></span>

                        <h2 className='scripture-select-header-text'>{selectedBook} {selectedChapter}:{selectedStartVerse}-</h2>

                    </div>

                    <div className='page-content-inner'>
                        <div className='scripture-list'>
                            {selectedBook && selectedChapter && selectedStartVerse && BooksChaptersVerses[selectedBook] ? (
                                Array.from({ 
                                    length: BooksChaptersVerses[selectedBook].verses[selectedChapter - 1] - selectedStartVerse + 1
                                }).map((_, index) => (
                                    <ScriptureSelectButton 
                                        key={selectedStartVerse + index} 
                                        text={`${selectedStartVerse + index}`}
                                        nextSelectStage={() => {
                                            setSelectedEndVerse(selectedStartVerse + index);
                                            nextSelectStage();
                                        }}
                                    />
                                ))
                            ) : (
                                <>No verses available.</>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    

  )
}

export default ScriptureSelect