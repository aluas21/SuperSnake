import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './features/Home';
import GameModes from './features/GameModes/GameModes';
import Game from './features/Game/Game';
import GameSettings from './features/GameSettings/GameSettings';
import Register from './features/Register/Register';
import Login from './features/Login/Login';
import Profile from './features/Profile/Profile';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

      {/* Protected routes */}
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/game-modes" element={<PrivateRoute><GameModes /></PrivateRoute>} />
      <Route path="/game-settings" element={<PrivateRoute><GameSettings /></PrivateRoute>} />
      <Route path="/game" element={<PrivateRoute><Game /></PrivateRoute>} />
    

      {/* Optional catch-all */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
