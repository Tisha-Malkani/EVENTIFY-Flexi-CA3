import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login data:", { email, password });
      
        try {
          const response = await axios.post('http://localhost:5000/api/auth/login', {
            email,
            password
          });
      
          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('sessionId', response.data.sessionId);
            console.log('Logged in successfully, token saved:', response.data.token);
            navigate('/home'); 
            window.location.reload();
          } else {
            setError(response.data.message || 'Login failed');
          }
        } catch (error) {
          console.error('Login error:', error);
          if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
          } else {
            setError('An error occurred. Please try again later.');
          }
        }
      };
      

    return (
        <div className="container">
            <h2>Login</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <a href="/register">Register here</a>
            </p>
        </div>
    );
};

export default Login;
