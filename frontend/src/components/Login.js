import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Este efecto se ejecuta cuando `isLoggedIn` cambia.
        if (isLoggedIn) {
            navigate('/notes'); // Navega a notas cuando el login es exitoso.
        }
    }, [isLoggedIn, navigate]);

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/login', credentials);
            console.log('Login successful:', response.data);
            localStorage.setItem('token', response.data.token); // Almacena el token en localStorage
            setIsLoggedIn(true); // Actualiza el estado para desencadenar la redirección
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : 'No response');
            alert('Login failed');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
                <p>No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
            </form>
        </div>
    );
}

export default Login;