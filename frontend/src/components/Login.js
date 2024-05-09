import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css'

function Login() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/login', credentials);
            console.log('Login successful:', response.data);
            localStorage.setItem('token', response.data.token); // Almacena el token en localStorage
            localStorage.setItem('role', response.data.role); // Almacena el rol en localStorage
            navigate('/notes'); // Redirecciona directamente a las notas
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : 'No response');
            alert('Login failed');
        }
    };

    return (
        <div>
            <h1>Log In</h1>
            <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                    className='form-content'
                />
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    className='form-content'
                />
                <button type="submit" className='form-button'>Log In</button>
                <p>No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
            </form>
            </div>
        </div>
    );
}

export default Login;