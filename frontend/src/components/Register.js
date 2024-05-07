import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/users/register', userDetails);
            console.log('Registration successful:', response.data);
            navigate('/login'); // Redirect to the login page
        } catch (error) {
            console.error('Registration error:', error.response ? error.response.data : 'No response');
            alert('Registration failed');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={userDetails.username}
                    onChange={handleChange}
                    required
                />
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleChange}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={userDetails.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Register</button>
                <p>Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
            </form>
        </div>
    );
}

export default Register;
