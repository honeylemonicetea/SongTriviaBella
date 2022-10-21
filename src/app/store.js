import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {createStore} from 'redux'
import {songsReducer} from '../reducers/songReducers'
import {playlistReducer} from '../reducers/playlistReducer'

const reducer = combineReducers({
    songsReducer,
    playlistReducer
});

// const cartItemsFromStorage = localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : [];
// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : null;

const initialState = {
//   cart: { cartItems: cartItemsFromStorage },
//   userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);


export default store;
