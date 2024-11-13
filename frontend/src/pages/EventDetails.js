import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../api/events';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventData = await getEventById(id);
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };
    fetchEventDetails();
  }, [id]);

  return (
    
    event ? (
      <div className="event-details">
        <h2>Event Details</h2>
        {event.image && <img src={`http://localhost:5000/${event.image}`} alt={event.title} className="event-image" />}
        <h1>{event.title}</h1>
        <p>{event.description}</p>
        <p>Date: {new Date(event.date).toLocaleDateString()}</p>
        {event.hostedBy && <p>Hosted By: {event.hostedBy}</p>}
        
        
        <footer className='footer'> 
        <div className="footer-content">
            <h3>Contact Us</h3>
            <p>Email: info@eventify.com</p>
            <p>Phone: +91 57482 96358</p>
            <p>Address: 123 Titanium Square, Pune</p>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2024 Eventify. All rights reserved.</p>
        </div>
        </footer>
      </div>
    ) : (
      
      <p>Loading...</p>
    )
  );
  
};

export default EventDetails;