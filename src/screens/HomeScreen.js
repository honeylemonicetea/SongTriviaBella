import React, {useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {playList} from '../actions/playlistActions'
import PlayListCard from '../components/PlayListCard'
import '../Styles/HomeScreen.css'

function HomeScreen() {
  const dispatch = useDispatch();
  const allPlaylists = useSelector((state) => state.playlistReducer);
  const { loading, error, playlists } = allPlaylists;
  localStorage.setItem('correct', "0")
  localStorage.setItem('wrong', "0")

  useEffect(() => {
    dispatch(playList());
  }, [dispatch]);

  console.log(playlists);

  return (
    <div className="home-container">
      <div className="playlist-container">
        {playlists.map((e) => (
          <PlayListCard
            cover_image={e.cover_image}
            title={e.title}
            slug_field={e.slug_field}
          />
        ))}
      
      </div>
    </div>
  );
}

export default HomeScreen