import React from 'react';
import NavBar from '../Components/NavBar';
import { updateStreak } from '../Components/Firebase';

// import { BibleGatewayAPI } from "bible-gateway-api";

// let bgw = new BibleGatewayAPI();

import DailyMeno from './DailyMeno';
import StreakWidget from '../Components/StreakWidget';

const Home = ({ scriptures, dailyMenoScripture, 
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
    
    let version = 'NIV';
    let query = encodeURIComponent("John 3:16");

    const url = `https://www.biblegateway.com/passage?search=${query}&version=${version}`;

    console.log("url ", url);

    try {
      const response = await fetch(url, { mode: 'no-cors' });
      
      console.log(response);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.text();
      console.log(data);
  
      console.log("start meno");
      
      // Additional logic here
  
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  

    // const randomIndex = Math.floor(Math.random() * scriptures.length);
    // setDailyMenoScripture(scriptures[randomIndex]);

    // setTimeout(() => {
    //     setMenoActivated(true);
    // }, 0); 
  };

  return (
    <div className="page-container">

      {menoCompleted && menoActivated && (
        <div className="page-content">

          <div className='page-header'>
            <h2 className='page-header-text'>Daily Challenge</h2>
            <StreakWidget currentStreak={currentStreak}/>
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
                  handleStreakIncrement={handleStreakIncrement}/>
      )}
      
      {(!menoActivated || menoCompleted) && (<NavBar setPage={setPage} />)}
    </div>
  );
};

export default Home;
