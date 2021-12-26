import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import GamesContainer from './containers/GamesContainer';
import Chart from './containers/Chart.js';
import Roster from './containers/Roster';
import TeamsContainer from './containers/TeamsContainer';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TeamsContainer />} exact/>          
          <Route path="/games" element={<GamesContainer />} exact/>
          <Route path="/charts" element={<Chart />} exact/>
          <Route path="/roster" element={<Roster />} exact/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
