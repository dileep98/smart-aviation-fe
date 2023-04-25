import './App.css';
import { createContext } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import DefaultLayout from './components/DefaultLayout';
import { useState, useEffect } from 'react';
import SavedFlights from './components/SavedFlights';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';

export const AppContext = createContext(null);

function App() {

  const navigate = useNavigate();

  const [tokenData, setTokenData] = useState({})
  const [userData, setUserData] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('user')) {
      setTokenData(JSON.parse(localStorage.getItem('token')))
      setUserData(JSON.parse(localStorage.getItem('user')))
      setIsAuthenticated(true)
      navigate('/search')
    }
  }, [])

  const handleLogin = (token, user) => {
    setIsAuthenticated(true)
    setTokenData(token)
    setUserData(user)
    localStorage.setItem('token', JSON.stringify(token))
    localStorage.setItem('user', JSON.stringify(user))
    navigate('/search')
  }

  const userUpdated = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    setUserData(user)
  }

  return (
    <AppContext.Provider value={{ user: userData, token: tokenData }}>
      <Toaster
        position="top-right"

      />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={isAuthenticated ? <DefaultLayout /> : <Navigate to='/login' />}>
          <Route path='search' element={<Home />} />
          <Route path='saved' element={<SavedFlights />} />
          <Route path='profile' element={<Profile onSave={userUpdated} />} />
          <Route path='admin' element={<AdminPanel />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
