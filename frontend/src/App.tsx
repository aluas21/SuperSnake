import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './features/Home';
import GameModes from './features/GameModes/GameModes';
import Game from './features/Game';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game-modes" element={<GameModes />} />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
