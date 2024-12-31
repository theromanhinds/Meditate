import React, { useState } from 'react'
import { books, bookChapters } from '../Components/Scriptures'
import ScriptureSelectButton from '../Components/ScriptureSelectButton';

function ScriptureSelect({ setSelectingScripture }) {

    const [selectStage, setSelectStage] = useState(1);
    const [selectedBook, setSelectedBook] = useState(null);

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

                            {books.length > 0 ? (
                                books.map(book => (
                                <ScriptureSelectButton text={book} 
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

                            <h2 className='scripture-select-header-text'>Select Chapter</h2>

                        </div>

                        <div className='page-content-inner'>
                            <div className='scripture-list'>

                            {selectedBook && bookChapters[selectedBook] ? (
                                Array.from({ length: bookChapters[selectedBook] }).map((_, index) => (
                                    <ScriptureSelectButton key={index + 1} text={`${index + 1}`} />
                                ))
                            ) : (
                                <>No chapters available.</>
                            )}

                            </div>
                        </div>

                </div>
            )}
        </>
    

  )
}

export default ScriptureSelect