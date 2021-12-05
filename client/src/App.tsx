import './App.css';
import Navbar from './components/Nav/Nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
// import { useContext } from 'react';
// import { UserContext } from './context/index';
import Articles from './pages/Articles';
import { ProtectedRoute } from './routes/ProtectedRoute';
import ArticlesPlans from './pages/ArticlesPlan';

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

        <Route path="/articles-plans" element={<ProtectedRoute />}>
          <Route path="/articles-plans" element={<ArticlesPlans />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
