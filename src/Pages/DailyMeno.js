import React, { useState } from 'react';
import useAudioRecorder from '../Functions/useAudioRecorder';  // Import the custom hook
import { evaluateTranscription } from '../Functions/evaluateTranscription';

import { db } from '../Components/Firebase';
import { doc, updateDoc } from 'firebase/firestore';

function DailyMeno({userData, dailyMenoScripture, setMenoCompleted, handleStreakIncrement}) {
    
    const [phase, setPhase] = useState(1);
    const [correctedString, setCorrectedString] = useState('');
    const [accuracy, setAccuracy] = useState('');
    const [canStopRecording, setCanStopRecording] = useState(false);

    const { transcription, startRecording, stopRecording } = useAudioRecorder();

    const handleStartRecording = () => {
        setPhase(2); 
        setCanStopRecording(false);
        startRecording();
        setTimeout(() => {
            setCanStopRecording(true);
          }, 1000);
    };

    const handleStopRecording = async () => {
        await stopRecording(); 
        setPhase(3);
    };

    const handleRestartRecording = async () => {
        setPhase(2);
        setCanStopRecording(false);
        startRecording();
        setTimeout(() => {
            setCanStopRecording(true);
          }, 1000);
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

    const handleReset = async () => {
        handleStreakIncrement();

        const userRef = doc(db, 'users', userData.userId);  
        await updateDoc(userRef, {
            lastMenoCompleted: new Date().toISOString().split('T')[0],  // Save today's date
        });

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
                <p className='sign-in-tagline'>{dailyMenoScripture.reference}</p>
            <div className='scripture-reference'>Recording...</div>

                <div className='meno-action-button-container'>

                    <button className='meno-action-button' disabled={!canStopRecording} onClick={handleStopRecording}>
                        <span className="icon"><i className="fas fa-stop"></i></span>
                    </button>

                </div>
            
            </div>
        )}

        {phase === 3 && (
            <div className='meno-container'>
                <p className='sign-in-tagline'>{dailyMenoScripture.reference}</p>
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

                <p className='sign-in-tagline'>{accuracy}</p>

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

                <p className='sign-in-tagline'>{dailyMenoScripture.reference}</p>

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