import React, { useState, useEffect } from 'react';
import NavBar from '../Components/NavBar';
import { updateStreak } from '../Components/Firebase';

import DailyMeno from './DailyMeno';

const Home = ({ scriptures, dailyMenoScripture, setDailyMenoScripture, setPage, userData, currentStreak, setCurrentStreak }) => {

  const [menoActivated, setMenoActivated] = useState(false);
  const [menoCompleted, setMenoCompleted] = useState(false);

  const handleStreakIncrement = () => {
    setCurrentStreak((prevStreak) => {
      const updatedStreak = prevStreak + 1;
      updateStreak(updatedStreak);
      return updatedStreak;
    });
  };
  
  const startDailyMeno = () => {
    console.log(scriptures)
    const randomIndex = Math.floor(Math.random() * scriptures.length);
    // console.log(randomIndex);
    setDailyMenoScripture(scriptures[randomIndex]);
};

  // Trigger menoActivated after dailyMenoScripture is set
  useEffect(() => {
    if (dailyMenoScripture) {
        setMenoActivated(true);
    }
}, [dailyMenoScripture]);

  return (
    <div className="page-container">

      {menoCompleted && !menoActivated && (
        <div className="page-content">

          <div className='page-header'>
            <h2 className='page-header-text'>Daily Meno</h2>
            <h2 className='page-header-streak'>🌿{currentStreak ? currentStreak : 0}</h2>
          </div>

          <div className='page-content-inner'>
            <h1 className='completed-scripture'>Completed</h1>
            <h2 className='completed-scripture'>{dailyMenoScripture.verse}</h2>
            <p className='completed-scripture'>{dailyMenoScripture.reference}</p>
            
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
        <DailyMeno dailyMenoScripture={dailyMenoScripture} 
                  setDailyMenoScripture={setDailyMenoScripture} 
                  setMenoCompleted={setMenoCompleted} 
                  setMenoActivated={setMenoActivated}
                  handleStreakIncrement={handleStreakIncrement}/>
      )}
      
      {!menoActivated && (<NavBar setPage={setPage} />)}
    </div>
  );
};

export default Home;
