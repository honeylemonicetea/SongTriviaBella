import React, {useState, useEffect} from 'react'
import {NavLink, useParams, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {songList} from '../actions/songActions'
import Song4 from '../components/Song4'

import '../Styles/GameScreen.css'

function GameScreen() {
    let params = useParams()


    const dispatch = useDispatch()
    const allSongs = useSelector(state => state.songsReducer);
    const {loading, error, songs}  = allSongs
    // localStorage.setItem('correct', "0")
    // localStorage.setItem('wrong', "0")
    let cor = localStorage.getItem('correct')
    let wrong = localStorage.getItem("wrong");

    useEffect(() => {
        dispatch(songList(params.artist_slug));
    }, [])
    console.log(songs)

    let refresh=()=>{
        dispatch(songList(params.artist_slug));
    }
  
    return (
      <div className='game-container'>
        <div className="game-inner">

          <h1>SONGS</h1>
          <p>
            {" "}
            <b>Correct: </b>
            {cor}
          </p>
          <p>
            <b>Wrong: </b>
            {wrong}
          </p>
          {loading ? (
            ""
          ) : error ? (
            { error }
          ) : (
            <Song4
              audio_src={songs.correct ? songs.correct.preview_url : ""}
              correct={songs.correct ? songs.correct.title : ""}
              all_songs={songs.all_songs ? songs.all_songs : []} refr = {refresh}
            />
          )}
        
        </div>
      </div>
    );
}

export default GameScreen