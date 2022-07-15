import {SONGS_FAIL, SONGS_REQUEST, SONGS_SUCCESS} from '../constants/songConstants'


export const songsReducer = (state={songs:[]}, action) =>{
    switch(action.type){
        case SONGS_REQUEST:
            return {loading: true, songs: [] }
        case SONGS_SUCCESS:
            return {loading: false, songs: action.payload}
        case SONGS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }

}