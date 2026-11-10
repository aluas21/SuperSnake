import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameModes from './pages/GameModes';
import Game from './pages/Game/Game';
import GameSettings from './pages/GameSettings';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile/Profile';
import Shop from './pages/Shop';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
import Logout from './pages/Logout';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Protected routes */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/game-modes"
        element={
          <PrivateRoute>
            <GameModes />
          </PrivateRoute>
        }
      />
      <Route
        path="/game-settings"
        element={
          <PrivateRoute>
            <GameSettings />
          </PrivateRoute>
        }
      />
      <Route
        path="/game"
        element={
          <PrivateRoute>
            <Game />
          </PrivateRoute>
        }
      />
      <Route
        path="/shop"
        element={
          <PrivateRoute>
            <Shop />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/logout"
        element={
          <PrivateRoute>
            <Logout />
          </PrivateRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
