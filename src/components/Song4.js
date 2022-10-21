import React, {useState, useRef, useEffect} from 'react'
import silence from '../assets/silence.mp3'

import "../Styles/GameScreen.css";


function Song4(props) {
    let cor = parseInt(localStorage.getItem('correct'))
    let wrong = parseInt(localStorage.getItem("wrong"));
    const audioRef = useRef()
    const [classN1, setClassN1] = useState("#ffc8dd");
    const [classN2, setClassN2] = useState("#ffc8dd");
    const [classN3, setClassN3] = useState("#ffc8dd");
    const [classN4, setClassN4] = useState("#ffc8dd");
    const [answer, setanswer] = useState("")

    


    useEffect(() => {
        if (props.audio_src){
          console.log(audioRef.current.volume)
          audioRef.current.muted = false
          audioRef.current.volume = 0.15
          audioRef.current.play()  //AUTOPLAY!!!
        }
    }, [])
    
    function checkAnswer(variant, btnNum){
        if(variant==props.correct){
            console.log('CORRECT')
            cor++
            localStorage.setItem('correct', cor.toString())
          
            switch (btnNum){
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
            console.log('INCORRECT!!')
            wrong++;
            setanswer(`The answer was ${props.correct}`)
            localStorage.setItem("wrong", wrong.toString());
               switch (btnNum) {
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
    // console.log(props.song_titles)
  return (
    <div className="song-wrapper">
      {/* <iframe
        allow="autoplay"
        src={silence}
        style={{ display: "none" }}
      ></iframe> */}
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
      <p className="reveal">{answer}</p>

    </div>
  );
}

export default Song4