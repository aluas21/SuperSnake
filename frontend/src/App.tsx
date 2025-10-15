import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './features/Home';
import GameModes from './features/GameModes/GameModes';
import Game from './features/Game/Game';
import GameSettings from './features/GameSettings/GameSettings';
import Register from './features/Register/Register';
import Login from './features/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game-modes" element={<GameModes />} />
        <Route path="/game-settings" element={<GameSettings />} />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
