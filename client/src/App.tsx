import './App.css';
import Navbar from './components/Nav/Nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { useContext } from 'react';
import { UserContext } from './context/index';

function App() {
  const [state, setState] = useContext(UserContext);
  console.log(state);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
