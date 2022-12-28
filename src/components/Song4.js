import React, {useState, useRef, useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import silence from '../assets/silence.mp3'

import "../Styles/GameScreen.css";


function Song4(props) {
    let cor = parseInt(localStorage.getItem('correct'))
    let wrong = parseInt(localStorage.getItem("wrong"));
    let songsNumber = localStorage.getItem("songs")
    const audioRef = useRef()
    const [classN1, setClassN1] = useState("#ffffff");
    const [classN2, setClassN2] = useState("#ffffff");
    const [classN3, setClassN3] = useState("#ffffff");
    const [classN4, setClassN4] = useState("#ffffff");
    const [answer, setanswer] = useState("")
    const [endMessage, setEndMessage] = useState("")
    const [gameState, setGameState] = useState(true) 

    useEffect(() => {
        if (songsNumber >= 20){
          // check for victory and hide the buttons if the game is over
          setGameState(false)

          if (cor > wrong){
            // setVictory(true)
            setEndMessage("Congratulations! You Won!")
          }
          else if (cor < wrong){
            // setLose(true)
            setEndMessage("Game Over! You Lost!")
          }
          else if (cor == wrong){
            // setTie(true)
            setEndMessage("It's A Tie!")
          }
        }
        else if (props.audio_src && gameState){
  
          audioRef.current.muted = false
          audioRef.current.volume = 0.3  //MUTED FOR DEVELOPMENT!!!!
          audioRef.current.play()  //AUTOPLAY!!!
        }
    }, [])
    
    function checkAnswer(variant, btnNum){
        songsNumber++
        localStorage.setItem('songs', songsNumber.toString())
        console.log(songsNumber)
        if(variant==props.correct){
            cor++
            localStorage.setItem('correct', cor.toString())
          
            switch (btnNum){
              // GREEN - correct answer
              case 1:
                setClassN1("#80ff8c");
                break
              case 2:
                setClassN2("#80ff8c");
                break
              case 3:
                setClassN3("#80ff8c");
                break
              case 4:
                setClassN4("#80ff8c");
                break
            }
            setTimeout(()=>{props.refr()}, 1000)
        }
        else{
            wrong++;
            setanswer(`The answer was ${props.correct}`)
            localStorage.setItem("wrong", wrong.toString());
               switch (btnNum) {
                // RED - incorrect
                 case 1:
                   setClassN1("#e56b6f");
                   break
                 case 2:
                   setClassN2("#e56b6f");
                   break
                 case 3:
                   setClassN3("#e56b6f");
                   break
                 case 4:
                   setClassN4("#e56b6f");
                   break
               }
               setTimeout(() => {
                 props.refr();
               }, 1000);
        }
    }
  if (gameState){
    return (

      <div className="song-wrapper">
        <audio
          src={props.audio_src}
          controls
          autoPlay={true}
          ref={audioRef}
          className="audio-player"
          muted='muted'
        />

        <div className="button-container">
          <button
            onClick={() => checkAnswer(props.all_songs[0], 1)}
            style={{ backgroundColor: classN1 }}
          >
            {props.all_songs[0]}
          </button>
          <button
            onClick={() => checkAnswer(props.all_songs[1], 2)}
            style={{ backgroundColor: classN2 }}
          >
            {props.all_songs[1]}
          </button>
          <button
            onClick={() => checkAnswer(props.all_songs[2], 3)}
            style={{ backgroundColor: classN3 }}
          >
            {props.all_songs[2]}
          </button>
          <button
            onClick={() => checkAnswer(props.all_songs[3], 4)}
            style={{ backgroundColor: classN4 }}
          >
            {props.all_songs[3]}
          </button>
        </div>
        <p className="reveal"><b>{answer}</b></p>

      </div>

    );
  }
  else if (gameState==false){
    return(
      <div>
       <h2>{endMessage}</h2>
       <NavLink to='/playlists/' className='next-btn'>Play Again</NavLink>
      </div>
    )
  }
}

export default Song4