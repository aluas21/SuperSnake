import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './features/Game';
import Home from './features/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
