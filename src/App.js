import logo from './logo.svg';
import './App.css';

// ROUTING
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

// REDUX
import {useSelector, useDispatch} from 'react-redux'
import store from './app/store'

// SCREENS
import HomeScreen from './screens/HomeScreen'
import GameScreen from './screens/GameScreen'
import Header from './components/Header'


function App() {
  const dispatch = useDispatch()


  return (
    <Router>
      <div className="App">
        <Header></Header>
          <Routes>
            <Route path='' element={<HomeScreen/>} />
            <Route path='/play/:artist_slug' element={<GameScreen/>}/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
