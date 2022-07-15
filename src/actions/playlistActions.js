import {PLAYLIST_FAIL, PLAYLIST_REQUEST, PLAYLIST_SUCCESS} from '../constants/playlistConstants'
import axios from 'axios'
import { SONGS_FAIL } from '../constants/songConstants'

export const playList = () => async(dispatch) =>{
    try {
        dispatch({type: PLAYLIST_REQUEST})
        const {data} = await axios.get("/api/playlists/")
        dispatch({type: PLAYLIST_SUCCESS, payload: data})
    }

    catch(error){
        dispatch({type: SONGS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message: error.message})
    }
}