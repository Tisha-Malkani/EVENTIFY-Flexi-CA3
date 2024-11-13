import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import { deleteEvent, updateEvent } from '../api/events';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);
  const [updatedEvent, setUpdatedEvent] = useState({ title: '', description: '', date: '' });
  const [hostedBy, setHostedBy] = useState('');       
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/events/admin/events', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => setEvents(response.data))
      .catch(error => setError(error.message));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    try {
      await deleteEvent(id, token);
      setEvents(events.filter(event => event._id !== id)); 
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEdit = (event) => {
    setEditingEventId(event._id);
    setUpdatedEvent({
      title: event.title,
      description: event.description,
      date: event.date,
    });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const { title, description, date } = updatedEvent;
    if (!title || !description || !date) {
      alert("All fields are required to update the event.");
      return;
    }
    try {
      await updateEvent(editingEventId, updatedEvent, token);
      setEvents(events.map(event =>
        event._id === editingEventId ? { ...event, ...updatedEvent } : event
      ));
      setEditingEventId(null);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent({ ...updatedEvent, [name]: value });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-dashboard-page">
      <h1>Dashboard</h1>
      <h2>Event List</h2>
      {events.length > 0 ? (
        <div className="events-list">
          {events.map(event => (
            <div 
              className={`event-card ${editingEventId === event._id ? 'zoomed' : ''}`} 
              key={event._id}
            >
              {editingEventId === event._id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    name="title"
                    value={updatedEvent.title}
                    onChange={handleChange}
                    placeholder="Event Title"
                  />
                  <textarea
                    name="description"
                    value={updatedEvent.description}
                    onChange={handleChange}
                    placeholder="Event Description"
                  />
                  <input
                    type="date"
                    name="date"
                    value={updatedEvent.date}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="Hosted By"
                    value={hostedBy}
                    onChange={(e) => setHostedBy(e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewImage(e.target.files[0])}
                  /><div className='button-container'>
                  <button className="save-button" onClick={handleSave}>Save</button>
                  <button className="cancel-button" onClick={() => setEditingEventId(null)}>Cancel</button></div>
                </div>
              ) : (
                <div className="event-card-content">
                  <h2>{event.title}</h2>
                  <p>{new Date(event.date).toLocaleDateString()}</p>
                  <div className='button-container'>
                  <button className="Edit" onClick={() => handleEdit(event)}>Edit</button>
                  <button className="Delete" onClick={() => handleDelete(event._id)}>Delete</button></div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No events to display.</p>
      )}
      <footer>
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
  );
};

export default AdminDashboard;
