import React from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

const DashboardLayout= ({ children }) => {
  return (
    <div>
      <Header/>
      {children}
      <Sidebar/>
      
    </div>
  );
};

export default DashboardLayout;

