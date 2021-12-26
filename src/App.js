import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import GamesContainer from './containers/GamesContainer';
import Chart from './containers/Chart.js';
import Roster from './containers/Roster';
import TableContainer from './containers/TableContainer';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/table" element={<TableContainer />} exact/>          
          <Route path="/games" element={<GamesContainer />} exact/>
          <Route path="/charts" element={<Chart />} exact/>
          <Route path="/roster" element={<Roster />} exact/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
