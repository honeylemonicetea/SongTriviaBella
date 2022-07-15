import {SONGS_FAIL, SONGS_REQUEST, SONGS_SUCCESS} from '../constants/songConstants'

import axios from 'axios'

export const songList = (artist) => async (dispatch)=>{
    if (artist=='all'){
        artist=''
    }
    try{
        dispatch({type: SONGS_REQUEST})
        const {data} = await axios.get(`/api/generate/${artist}`)
        dispatch({type:SONGS_SUCCESS, payload: data})
    }
    catch(error){
        dispatch({type: SONGS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message: error.message})
    }
}  