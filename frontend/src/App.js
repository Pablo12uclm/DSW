import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NotesList from './components/NotesList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);

  useEffect(() => {
    // Este evento se dispara cuando se actualiza el localStorage
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('token') ? true : false);
    };

    // Agrega el listener para el evento de almacenamiento
    window.addEventListener('storage', handleStorageChange);

    // Limpieza del componente
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={isLoggedIn ? <NotesList /> : <Navigate replace to="/login" />} />
        <Route path="/" element={<Navigate replace to={isLoggedIn ? "/notes" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
