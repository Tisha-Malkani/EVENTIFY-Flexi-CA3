import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/Logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();  
    localStorage.removeItem('token'); 
    navigate('/login'); 
    window.location.reload();
  };

  return (
    <nav>
        <img src={logo} alt="Logo" />
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/login" onClick={handleLogout}>Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
