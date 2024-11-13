import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { email, password });
            if (response.data.success) {
                console.log('Registration successful');
                navigate('/login');  
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage('Registration failed. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit">Register</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
    );
};

export default Register;

