import './App.css';
import GamesContainer from './containers/GamesContainer';
import Chart from './containers/Chart.js';
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GamesContainer />} exact/>
          <Route path="/charts" element={<Chart />} exact/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
