import React, { useState } from 'react';

const LogIn = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(errorMessage => {
            throw new Error(errorMessage); // Corregido: pasa el mensaje de error
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Login successful:', data);
        onLogin(data); // Llama a la función proporcionada por el padre para manejar el inicio de sesión
      })
      .catch(error => {
        console.error('Error during login:', error);
        setError(error.message); // Establece el mensaje de error obtenido del backend
      });
  };

  return (
    <div>
      <h2>Log In</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      {/* Mostrar mensaje de error si existe */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default LogIn;
