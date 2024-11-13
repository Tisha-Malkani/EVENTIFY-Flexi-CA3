import React from 'react';
import AdminDashboard from '../components/AdminDashboard';

const DashboardPage = ({ user }) => {
  if (!user) {
    return <div>Please log in to view the dashboard.</div>;
  }

  return (
    <div>
      
       <AdminDashboard /> 
    </div>
  );
};

export default DashboardPage;
