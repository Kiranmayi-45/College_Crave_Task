import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import OldAcListing from './pages/OldAcListing';
import Pricing from './pages/Pricing';
import SellersPage from './pages/SellersPage';
import AuthModal from './components/AuthModal';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  return (
    <Router>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} setUser={setUser} user={user} />
      <Routes>
        <Route path="/" element={<Home user={user} openAuth={() => setAuthOpen(true)} />} />
        <Route path="/old-acs" element={<OldAcListing user={user} openAuth={() => setAuthOpen(true)} />} />
        <Route path="/pricing" element={<Pricing user={user} openAuth={() => setAuthOpen(true)} />} />
        <Route path="/sell" element={<SellersPage user={user} openAuth={() => setAuthOpen(true)} />} />
      </Routes>
    </Router>
  );
}

export default App;
