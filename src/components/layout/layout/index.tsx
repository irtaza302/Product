import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/navbar';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout; 