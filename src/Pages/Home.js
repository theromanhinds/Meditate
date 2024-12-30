import React, { useState } from 'react';
import NavBar from '../Components/NavBar';

import DailyMeno from './DailyMeno';

const Home = ({ scriptures, setPage, userData }) => {

  const [menoActivated, setMenoActivated] = useState(false);
  const [menoCompleted, setMenoCompleted] = useState(false);

  const [phase, setPhase] = useState(1);
  
  const [scripture, setScripture] = useState(null);

  const startDailyMeno = () => {
    setMenoActivated(true);
  }

  return (
    <div className="page-container">

      {menoCompleted && !menoActivated && (
        <div className="page-content">

          <div className='page-header'>
            <h2 className='page-header-text'>Daily Meno</h2>
            <h2 className='page-header-streak'>🌿{userData ? userData.stats.streak : 0}</h2>
          </div>

          <div className='page-content-inner'>
            <h1 className='completed-scripture'>Completed</h1>
            <h2 className='completed-scripture'>{scriptures[0].scripture}</h2>
            <p className='completed-scripture'>{scriptures[0].reference}</p>
            
          </div>

        </div>
      )}

      
      {!menoCompleted && !menoActivated && (
        <div className="page-content">
        
          <div className='page-header'>
            <h2 className='page-header-text'>Daily Meno</h2>
            <h2 className='page-header-streak'>🌿{userData ? userData.stats.streak : 0}</h2>
          </div>

          <div className='page-content-inner'>
            <button className='daily-meno-button' onClick={startDailyMeno}>
              Tap to Begin
            </button>
          </div>
        </div>
      )}
      
      {menoActivated && (
        <DailyMeno scriptures={scriptures} setMenoCompleted={setMenoCompleted} setMenoActivated={setMenoActivated}/>
      )}
      
      {!menoActivated && (<NavBar setPage={setPage} />)}
    </div>
  );
};

export default Home;
