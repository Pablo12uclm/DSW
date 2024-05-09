<<<<<<< Updated upstream
import React, { useState } from 'react';
import './styles/App.css';
=======
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
>>>>>>> Stashed changes
import NotesList from './components/NotesList';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import UserManagement from './components/UserManagement';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showLogIn, setShowLogIn] = useState(true); // Nuevo estado para controlar si se muestra el LogIn o SignUp

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    if (userData.username === 'admin') {
      setIsAdmin(true);
      setShowUserManagement(true)
    }
  };

  const handleUserManagement = () => {
    setShowUserManagement(true);
  };

  const handleExitUserManagement = () => {
    setShowUserManagement(false);
  };

  const handleToggleForm = () => {
    setShowLogIn(!showLogIn); // Alternar entre mostrar LogIn y SignUp
  };

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      
      {/* Mostrar el componente de LogIn o SignUp según el estado */}
      {showLogIn ? (
        <LogIn onLogin={handleLogin} />
      ) : (
        <SignUp onSignUp={handleLogin} />
      )}

      {/* Mostrar el componente de Notas solo si el usuario está logueado */}
      {isLoggedIn && <NotesList isAdminLoggedIn={isAdmin} />}
      
      {/* Mostrar el botón de alternar formulario */}
      {!isLoggedIn && (
        <button onClick={handleToggleForm}>
          {showLogIn ? 'SignUp' : 'LogIn'}
        </button>
      )}

      {/* Mostrar el componente de UserManagement si el usuario es admin */}
      {showUserManagement && <UserManagement onExit={handleExitUserManagement} />}
    </div>
  );
}

export default App;
