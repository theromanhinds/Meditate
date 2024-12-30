import React, { useState, useEffect } from 'react';
import useAudioRecorder from '../Functions/useAudioRecorder';  // Import the custom hook

function DailyMeno({scriptures, setMenoActivated, setMenoCompleted}) {
    
    const [phase, setPhase] = useState(1);

    const { isRecording, transcription, startRecording, stopRecording } = useAudioRecorder();

    const handleStartRecording = () => {
        setPhase(2); 
        startRecording();
    };

    const handleStopRecording = async () => {
        await stopRecording(); 
        setPhase(3);
    };

    const handleRestartRecording = async () => {
        setPhase(2);
        startRecording();
    };

    const handleContinue = async () => {
        setPhase((prevPhase) => prevPhase + 1);
    };

    const handleReset = () => {
        setMenoCompleted(true);
        setMenoActivated(false);        
    };

    // Get a random scripture when entering phase 2
    // const getRandomScripture = () => {
    // const randomIndex = Math.floor(Math.random() * scriptures.length);
    // setScripture(scriptures[randomIndex]);
    // };

    return (
        <>

        {phase === 1 && (
            <div className='meno-container'>

                <div className='scripture-reference'>{scriptures[0].reference}</div>

                <div className='meno-action-button-container'>

                    <button className='meno-action-button' onClick={handleStartRecording}>
                        <span className="icon"><i class="fas fa-microphone"></i></span>
                    </button>

                </div>

            </div>
        )}

        {phase === 2 && (
            <div className='meno-container'>

            <div className='scripture-reference'>Recording...</div>

                <div className='meno-action-button-container'>

                    <button className='meno-action-button' onClick={handleStopRecording}>
                        <span className="icon"><i class="fas fa-stop"></i></span>
                    </button>

                </div>
            
            </div>
        )}

        {phase === 3 && (
            <div className='meno-container'>

                <h3 className='scripture-transcription'>{transcription}</h3>
                
                <div className='meno-action-button-container'>

                    <button className='meno-action-button' onClick={handleRestartRecording}>
                        <span className="icon"><i class="fas fa-rotate-left"></i></span>
                    </button>

                    <button className='meno-action-button' onClick={handleContinue}>
                        <span className="icon"><i class="fas fa-arrow-right"></i></span>
                    </button>

                </div>

            </div>
        )}

        {phase === 4 && (
            <div className='meno-container'>

                <p className='accuracy-score'>Accuracy: 50%</p>

                <h3 className='scripture-transcription'>{transcription} </h3>
                
                <div className='meno-action-button-container'>

                    <button className='meno-action-button' onClick={handleRestartRecording}>
                        <span className="icon"><i class="fas fa-rotate-left"></i></span>
                    </button>

                    <button className='meno-action-button' onClick={handleContinue}>
                        <span className="icon"><i class="fas fa-arrow-right"></i></span>
                    </button>

                </div>
                
            </div>
        )}

        {phase === 5 && (
            <div className='meno-container'>

                <p className='accuracy-score'>{scriptures[0].reference}</p>

                <h3 className='scripture-transcription'>{scriptures[0].scripture}</h3>
                
                <div className='meno-action-button-container'>

                    <button className='meno-action-button' onClick={handleReset}>
                        <span className="icon"><i class="fas fa-arrow-right"></i></span>
                    </button>

                </div>
                
            </div>
        )}

       
        </>
    )
}

export default DailyMeno