import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

const Home = () => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventImage, setEventImage] = useState(null);
  const [hostedBy, setHostedBy] = useState('');
  const [events, setEvents] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);  
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleAddEvent = async (e) => {
    e.preventDefault();

    if (!eventName || !eventDescription || !eventDate || !eventImage || !hostedBy) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append('title', eventName);
    formData.append('description', eventDescription);
    formData.append('date', eventDate);
    formData.append('image', eventImage);  
    formData.append('hostedBy', hostedBy);  

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Please log in first.");
        return;
      }

      const response = await axios.post('http://localhost:5000/api/events/create', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Event created:', response.data);
      alert('Event created successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event.');
    }
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Eventify</h1>
        <p>Create and manage events easily!</p>
      </div>

      <div className="popular-events">
        <h2>Popular Events</h2>
        <div className="events-list">
          {loading ? (
            <p>Loading events...</p>
          ) : (
            events.slice(0, 10).map((event) => (
              <div className="event-card" key={event._id}>
                
                <h3>{event.title}</h3>
                <p className='info'>Date: {new Date(event.date).toLocaleDateString()}</p>
                {event.hostedBy && <p className='info'>Hosted By: {event.hostedBy}</p>}
                <button className="viewDetails"onClick={() => navigate(`/event-details/${event._id}`)}>View Details</button>
              </div>
            ))
          )}
        </div>
      </div>
      <h2>Create a New Event</h2>
      <div className="create-event">
        
        <form onSubmit={handleAddEvent}>
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <textarea
            placeholder="Event Description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setEventImage(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Hosted By"
            value={hostedBy}
            onChange={(e) => setHostedBy(e.target.value)}
          />
          <button type="submit">Create Event</button>
        </form>
      </div>
      <footer>
    <div className="footer-content">
      <h3>Contact Us</h3>
      <p>Email: info@Eventify.com</p>
      <p>Phone: +91 57482 96358</p>
      <p>Address: 123 Titanium Square, Pune</p>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2024 Eventify. All rights reserved.</p>
    </div>
  </footer>
    </div>
  );
};

export default Home;