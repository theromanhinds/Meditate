import React, { useState, useEffect } from 'react';
import useAudioRecorder from '../Functions/useAudioRecorder';  // Import the custom hook
import { evaluateTranscription } from '../Functions/evaluateTranscription';

function DailyMeno({dailyMenoScripture, setMenoCompleted, handleStreakIncrement}) {
    
    const [phase, setPhase] = useState(1);
    const [correctedString, setCorrectedString] = useState('');
    const [accuracy, setAccuracy] = useState('');

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

    const handleEvaluateTranscription = () => {
        const result = evaluateTranscription(transcription, dailyMenoScripture.verse);
        setCorrectedString(result.correctedString);
        setAccuracy(result.accuracy);
        setPhase(4);
    }

    const handleContinue = () => {
        setPhase(5);
    };

    const handleReset = () => {
        handleStreakIncrement();
        setMenoCompleted(true);
    };

    return (
        <>

        {phase === 1 && (
            <div className='meno-container'>

                <div className='scripture-reference'>{dailyMenoScripture.reference}</div>

                <div className='meno-action-button-container'>

                    <button className='meno-action-button' onClick={handleStartRecording}>
                        <span className="icon"><i className="fas fa-microphone"></i></span>
                    </button>

                </div>

            </div>
        )}

        {phase === 2 && (
            <div className='meno-container'>

            <div className='scripture-reference'>Recording...</div>

                <div className='meno-action-button-container'>

                    <button className='meno-action-button' onClick={handleStopRecording}>
                        <span className="icon"><i className="fas fa-stop"></i></span>
                    </button>

                </div>
            
            </div>
        )}

        {phase === 3 && (
            <div className='meno-container'>

                <h3 className='scripture-transcription'>{transcription}</h3>
                
                <div className='meno-action-button-container'>

                    <button className='meno-action-button' onClick={handleRestartRecording}>
                        <span className="icon"><i className="fas fa-rotate-left"></i></span>
                    </button>

                    <button className='meno-action-button' onClick={handleEvaluateTranscription}>
                        <span className="icon"><i className="fas fa-arrow-right"></i></span>
                    </button>

                </div>

            </div>
        )}

        {phase === 4 && (
            <div className='meno-container'>

                <p className='accuracy-score'>{accuracy}</p>

                <h3 className='scripture-transcription'>{correctedString} </h3>
                
                <div className='meno-action-button-container'>

                    <button className='meno-action-button' onClick={handleRestartRecording}>
                        <span className="icon"><i className="fas fa-rotate-left"></i></span>
                    </button>

                    <button className='meno-action-button' onClick={handleContinue}>
                        <span className="icon"><i className="fas fa-arrow-right"></i></span>
                    </button>

                </div>
                
            </div>
        )}

        {phase === 5 && (
            <div className='meno-container'>

                <p className='accuracy-score'>{dailyMenoScripture.reference}</p>

                <h3 className='scripture-transcription'>{dailyMenoScripture.verse}</h3>
                
                <div className='meno-action-button-container'>

                    <button className='meno-action-button' onClick={handleReset}>
                        <span className="icon"><i className="fas fa-arrow-right"></i></span>
                    </button>

                </div>
                
            </div>
        )}

       
        </>
    )
}

export default DailyMeno