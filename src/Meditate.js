import React, { useState, useEffect } from 'react';
import useAudioRecorder from './useAudioRecorder';  // Import the custom hook

const Meditate = ({ scriptures }) => {
    const [phase, setPhase] = useState(1); // Start with phase 1
    const [scripture, setScripture] = useState(null);
    const { isRecording, transcription, startRecording, stopRecording } = useAudioRecorder();  // Use the hook

    // Get a random scripture when entering phase 1
    const getRandomScripture = () => {
        const randomIndex = Math.floor(Math.random() * scriptures.length);
        setScripture(scriptures[randomIndex]);
    };

    const handleStartRecording = () => {
        setPhase(2);
        startRecording();
    };

    const handleStopRecording = async () => {
        const audioBlob = await stopRecording(); // Ensure audioBlob is returned from stopRecording
        setPhase(3);
    };

    const handleReset = () => {
        setPhase(1);
        getRandomScripture();
    };

    // Load random scripture when component mounts
    useEffect(() => {
        getRandomScripture();
    }, []);

    return (
        <div className="main-container">
            <div className="content">
                {phase === 1 && (
                    <>
                        <h2 className="scripture-reference">{scripture?.reference}</h2>
                    </>
                )}

                {phase === 2 && (
                    <div className="waveform-container">
                        {/* Add your waveform component here */}
                        <h3>Recording...</h3>
                    </div>
                )}

                {phase === 3 && (
                    <>
                        <h3>Transcription:</h3>
                        <p>{transcription}</p>
                        <h4>{scripture?.reference}</h4>
                        <p>{scripture?.scripture}</p>
                    </>
                )}
            </div>

            <button 
                className="record-button" 
                onClick={phase === 1 ? handleStartRecording : phase === 2 ? handleStopRecording : handleReset}
            >
                {phase === 1 && 'Start Recording'}
                {phase === 2 && 'Stop Recording'}
                {phase === 3 && 'Reset'}
            </button>
        </div>
    );
};

export default Meditate;
