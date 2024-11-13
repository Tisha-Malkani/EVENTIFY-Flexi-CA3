import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'; 
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Events from './pages/Events';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import EventDetails from './pages/EventDetails';
import fetchUserData  from './api/login'; 

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token)
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching user data:', err);
          setLoading(false);
        });
    } else {
      setLoading(false); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null); 
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <div>
        {/* Render Navbar only if user is logged in */}
        {user && <Navbar user={user} onLogout={handleLogout} />}
        
        <Routes>
          <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
          <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/home" /> : <Register />} />
          <Route path="/home" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
          <Route path="/events" element={user ? <Events /> : <Navigate to="/login" />} />
          <Route path="/event-details/:id" element={user ? <EventDetails /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          {/* Catch-all route to redirect to login or home based on auth state */}
          <Route path="*" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
