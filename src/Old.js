import React, { useState, useRef, useEffect } from 'react';
import AudioRecorder from './Meditate';

const ScripturePage = ({ scripture }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState('');
    const [audioData, setAudioData] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const waveformRef = useRef(null); // Will hold the waveform visualization

    const handleRecordClick = () => {
        if (isRecording) {
            setIsRecording(false);
        } else {
            setIsRecording(true);
        }
    };

    const handleStopRecording = (data) => {
        setAudioData(data);
        setTranscription(data.transcribedText);  // Example, change according to API response
        setIsCompleted(true);
    };

    const handleReset = () => {
        setIsRecording(false);
        setTranscription('');
        setIsCompleted(false);
    };

    return (
        <div className="app-container">
            <div className="scripture-display">
                <h1>{scripture}</h1>
            </div>

            {isCompleted ? (
                <div className="transcription-display">
                    <p>{transcription}</p>
                    <p><strong>NIV: </strong>{scripture}</p>
                </div>
            ) : (
                <AudioRecorder 
                    isRecording={isRecording}
                    onStop={handleStopRecording}
                    waveformRef={waveformRef} // Display the waveform when speaking
                />
            )}

            <div className="button-container">
                {!isCompleted ? (
                    <button onClick={handleRecordClick}>
                        {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </button>
                ) : (
                    <button onClick={handleReset}>Reset</button>
                )}
            </div>
        </div>
    );
};

export default ScripturePage;
