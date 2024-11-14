
# Eventify: Event Management System

Eventify is a full-stack web application that allows users to manage events easily. Built with MongoDB, Node.js, JavaScript, HTML, and CSS, this platform enables users to register, log in, create, view, edit, and delete events through an intuitive interface.

## Features

- **User Authentication**: Secure registration and login functionality.
- **Home Page**: Showcases featured events and provides a form to create new events.
- **Events Page**: Displays a complete list of all events.
- **Event Details Page**: Each event card has a "View Details" button for more information.
- **User Dashboard**: A personalized dashboard for managing user-created events, with edit and delete options.
- **Real-time Database Sync**: All event updates are immediately reflected across the platform.


## Setup Instructions

### Prerequisites
- **Node.js** and **npm**
- **MongoDB** (local setup)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Tisha-Malkani/EVENTIFY-Flexi-CA3.git
   cd eventify
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Variables**
   - Create a `.env` file in the `backend` folder with:
     ```env
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/event_management
     ```

5. **Start the Application**
   - **Backend**: `cd backend && npm start`
   - **Frontend**: `cd frontend && npm start`

6. **Access**: Visit `http://localhost:3000`


## Technologies Used

- **Frontend**: React.js, HTML, CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB for data storage

--- 

