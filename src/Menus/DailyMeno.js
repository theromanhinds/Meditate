import React, { useState, useEffect } from 'react';
import NavBar from '../Components/NavBar';

import useAudioRecorder from '../Functions/useAudioRecorder';  // Import the custom hook

const DailyMeno = ({ scriptures, setPage, userData }) => {

  const [phase, setPhase] = useState(1);  // Track the current phase

  const [scripture, setScripture] = useState(null);
  const { isRecording, transcription, startRecording, stopRecording } = useAudioRecorder();

  const handleStartRecording = () => {
    setPhase(3); // Move to phase 3 (Recording)
    startRecording();
  };

  const handleStopRecording = async () => {
    await stopRecording(); // Stop recording
    setPhase(4); // Move to phase 4 (Show transcription)
  };

  const handleReset = () => {
    setPhase(1); // Go back to phase 1
    getRandomScripture();
  };

  // Get a random scripture when entering phase 2
  const getRandomScripture = () => {
    const randomIndex = Math.floor(Math.random() * scriptures.length);
    setScripture(scriptures[randomIndex]);
  };

  const handleSphereClick = () => {
    setPhase(2);  // Move to phase 2 after clicking the sphere
    getRandomScripture();
  };

  // Load random scripture when component mounts or phase changes
  useEffect(() => {
    if (phase === 2) {
      getRandomScripture();
    }
  }, [phase]);

  return (
    <div className="page-container">
      <div className="page-content">
        
        <div className='page-header'>
          <h2 className='page-header-text'>Daily Meno</h2>
          <h2 className='page-header-streak'>🌿{userData ? userData.stats.streak : 0}</h2>
        </div>

        <div className='page-content-inner'>
          <button className='daily-meno-button'>
            Tap to Begin
          </button>
        </div>
        
        {/* {phase === 1 && ( // Phase 1: Main Menu
          <div className="main-menu">
            <button className="glowing-sphere" onClick={handleSphereClick}>Tap to Begin</button>
          </div>
        )}

        {phase === 2 && ( // Phase 2: Show random scripture and start recording
          <div className=''>
            <h2 className="scripture-reference">{scripture?.reference}</h2>

            <button className="record-button" onClick={handleStartRecording}>
              Start Recording
            </button>
          </div>
        )}

        {phase === 3 && ( // Phase 3: Recording in progress
          <div className="waveform-container">
            <h3>Recording...</h3>
            <button className="record-button" onClick={handleStopRecording}>
              Stop Recording
            </button>
          </div>
        )}

        {phase === 4 && ( // Phase 4: Show transcription and scripture
          <>
            <h3>Transcription:</h3>
            <p>{transcription}</p>
            <h4>{scripture?.reference}</h4>
            <p>{scripture?.scripture}</p>
            <button className="record-button" onClick={handleReset}>
              Reset
            </button>
          </>
        )} */}
      </div>
      <NavBar setPage={setPage} />
    </div>
  );
};

export default DailyMeno;
