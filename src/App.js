import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import DefaultLayout from './components/DefaultLayout';
import { useState, useEffect } from 'react';
import SavedFlights from './components/SavedFlights';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('token'))?.hasOwnProperty('accessToken') && window.location.pathname.includes('login')) {
      navigate('login')
    }
  }, [navigate])

  const handleLogin = (token) => {
    setIsLoggedIn(true)
    localStorage.setItem('token', JSON.stringify(token))
    navigate('/search')
  }

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<DefaultLayout />}>
        <Route path='search' element={<Home />} />
        <Route path='saved' element={<SavedFlights />} />
        <Route path='profile' element={<Profile />} />
        <Route path='admin' element={<AdminPanel />} />
      </Route>
    </Routes>
  );
}

export default App;
