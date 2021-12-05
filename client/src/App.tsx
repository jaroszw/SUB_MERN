import './App.css';
import Navbar from './components/Nav/Nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
// import { useContext } from 'react';
// import { UserContext } from './context/index';
import Articles from './pages/Articles';
import { ProtectedRoute } from './routes/ProtectedRoute';

function App() {
  // const [state, setState] = useContext(UserContext);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/articles" element={<ProtectedRoute />}>
          <Route path="/articles" element={<Articles />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
