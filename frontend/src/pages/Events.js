import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents } from '../api/events';
import './Events.css';

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const eventsData = await getEvents();
      setEvents(eventsData);
    };
    fetchData();
  }, []);

  return (
    <div className="events-page">
      <h1>All Events</h1>
      <div className="events-list">
        {events.map(event => (
          <div className="event-card" key={event._id}>
            <h2>{event.title}</h2>
            <p className='info'>Date: {new Date(event.date).toLocaleDateString()}</p>
            {event.hostedBy && <p className='info'>Hosted By: {event.hostedBy}</p>}

            <button className="viewDetails"onClick={() => navigate(`/event-details/${event._id}`)}>View Details</button>
          </div>
         
        ))}
        
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

export default Events;