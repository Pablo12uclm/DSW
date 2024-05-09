import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Register.css';

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
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-container'>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={userDetails.username}
                        onChange={handleChange}
                        required
                        className='form-content'
                    />
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleChange}
                        required
                        className='form-content'
                    />
                </div>
                <div className='form-container1'>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={userDetails.password}
                        onChange={handleChange}
                        required
                        className='form-content'
                    />
                    <button type="submit" className='form-button'>Register</button>
                    <p>Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
                </div>
            </form>
            
        </div>
    );
}

export default Register;
