import React from 'react';
import NavBar from '../Components/NavBar';
import { updateStreak } from '../Components/Firebase';

import { db } from '../Components/Firebase';
import { doc, updateDoc } from 'firebase/firestore';

import DailyMeno from './DailyMeno';
import StreakWidget from '../Components/StreakWidget';

const Home = ({ userData, scriptures, dailyMenoScripture, 
                menoActivated, setMenoActivated, menoCompleted,
                setMenoCompleted, setDailyMenoScripture, 
                setPage, currentStreak, setCurrentStreak }) => {


  const handleStreakIncrement = () => {
    setCurrentStreak((prevStreak) => {
      const updatedStreak = prevStreak + 1;
      updateStreak(updatedStreak);
      return updatedStreak;
    });
  };
  
  const startDailyMeno = async () => {

    if (scriptures.length === 0) {
      console.log("No scriptures");
    } else {
      const randomIndex = Math.floor(Math.random() * scriptures.length);
      setDailyMenoScripture(scriptures[randomIndex]);
  
      const userRef = doc(db, 'users', userData.userId);  
      await updateDoc(userRef, {
        dailyMenoScripture: scriptures[randomIndex],
      });
  
      setTimeout(() => {
          setMenoActivated(true);
      }, 0); 
    }
  };

  return (
    <div className="page-container">

      {menoCompleted && (
        <div className="page-content">

          <div className='page-header'>
            <h2 className='page-header-text'>Daily Challenge</h2>
            <StreakWidget currentStreak={currentStreak}/>
          </div>

          <div className='page-content-inner'>
            <h1 className='completed-scripture'>Completed</h1>
            <h2 className='completed-scripture'>{dailyMenoScripture?.verse}</h2>
            <p className='completed-scripture'>{dailyMenoScripture?.reference}</p>
            
          </div>

        </div>
      )}

      
      {!menoCompleted && !menoActivated && (
        <div className="page-content">
        
          <div className='page-header'>
            <h2 className='page-header-text'>Daily Challenge</h2>
            <StreakWidget currentStreak={currentStreak}/>
          </div>

          <div className='page-content-inner'>
            <button className='daily-meno-button' onClick={startDailyMeno}>
              <span className="play-icon"><i className="fab fa-pagelines"></i></span>
            </button>

            <p className='tap-to-start'>Tap to start!</p>
          </div>
        </div>
      )}
      
      {!menoCompleted && menoActivated && (
        <DailyMeno dailyMenoScripture={dailyMenoScripture} 
                  setDailyMenoScripture={setDailyMenoScripture} 
                  setMenoCompleted={setMenoCompleted} 
                  setMenoActivated={setMenoActivated}
                  handleStreakIncrement={handleStreakIncrement}
                  userData={userData}/>
      )}
      
      {(!menoActivated || menoCompleted) && (<NavBar setPage={setPage} />)}
    </div>
  );
};

export default Home;
