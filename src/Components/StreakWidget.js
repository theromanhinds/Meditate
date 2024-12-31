import React from 'react'

function StreakWidget({ currentStreak }) {
  return (
    <div className='streak-widget-container'>
        <p className='page-header-streak'>{currentStreak ? currentStreak : 0} Day Streak</p>
    </div>
  )
}

export default StreakWidget