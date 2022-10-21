import {PLAYLIST_FAIL, PLAYLIST_REQUEST, PLAYLIST_SUCCESS} from '../constants/playlistConstants'


export const playlistReducer = (state={playlists:[]}, action) =>{
    switch(action.type){
        case PLAYLIST_REQUEST:
            return {loading: true, playlists: []}
        case PLAYLIST_SUCCESS:
            return {loading: false, playlists: action.payload}
        case PLAYLIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state 
    }
}
