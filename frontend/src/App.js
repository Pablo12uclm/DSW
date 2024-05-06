import React, { useState } from 'react';
import './styles/App.css';
import NotesList from './components/NotesList';
import LogIn from './components/LogIn';
import UserManagement from './components/UserManagement';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);

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

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      
      {/* Mostrar el componente de Login si el usuario no está logueado */}
      {!isLoggedIn && <LogIn onLogin={handleLogin} />}
      
      {/* Mostrar el componente de gestión de usuarios si el usuario está logueado y es administrador */}
      {/*{isLoggedIn && isAdmin && <UserManagement/>}*/}

      {/* Mostrar el componente de Notas solo si el usuario está logueado */}
      {isLoggedIn && <NotesList isAdminLoggedIn={isAdmin}/>}
      
      
    </div>
  );
}

export default App;