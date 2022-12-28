import React from 'react'
import '../Styles/HomeScreen.css'
import {NavLink} from 'react-router-dom'

function HomeScreen() {

  return (
    <div className="home-container">
      <div className="home-inner">
          <h1>Welcome to Song Trivia. Bella Edition 🦇🐈‍⬛</h1>
          <NavLink className='start-btn' to='playlists/'>Play</NavLink>
      </div>
      
    </div>
  );
}

export default HomeScreen