import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './features/Home';
import GameModes from './features/GameModes/GameModes';
import Game from './features/Game/Game';
import GameSettings from './features/GameSettings/GameSettings';
import Register from './features/Register/Register';
import Login from './features/Login/Login';
import Profile from './features/Profile/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game-modes" element={<GameModes />} />
        <Route path="/game-settings" element={<GameSettings />} />
        <Route path="/profile" element={<Profile />} />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
