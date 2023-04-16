import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import DefaultLayout from './components/DefaultLayout';
import { useState, useEffect } from 'react';

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if(JSON.parse(localStorage.getItem('token'))?.hasOwnProperty('accessToken')){
      setIsLoggedIn(true)
      navigate('/')
    }
  }, [navigate])

  const handleLogin = (token) => {
    setIsLoggedIn(true)
    localStorage.setItem('token', JSON.stringify(token))
    navigate('/')
  }

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<DefaultLayout isLoggedIn={isLoggedIn} />}>
        <Route path='/' element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
