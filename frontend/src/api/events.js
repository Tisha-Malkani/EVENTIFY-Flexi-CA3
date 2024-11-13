import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events'; 

// Fetch all events (public route)
export const getEvents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Return events data
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error; // Rethrow the error for further handling
  }
};

// Fetch events for the logged-in admin (admin-specific route)
export const getEventsForAdmin = async (token) => {
  try {
    axios.get('http://localhost:5000/api/events/admin/events', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        }
      })
      .then(response => {
        console.log('Fetched events:', response.data);
      })
      .catch(error => {
        console.error('Error fetching admin events:', error);
      });
      
  } catch (error) {
    console.error('Error fetching admin events:', error);
    throw error; 
  }
};

// Fetch a specific event by ID
export const getEventById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error; 
  }
};



// Update an existing event (admin-only)
export const updateEvent = async (id, event, token) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, event, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  };
  
  export const deleteEvent = async (id, token) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  };