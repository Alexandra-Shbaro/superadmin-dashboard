import React from 'react';
import Header from './components/Header';
import { Sidebar } from './components/Sidebar';

export default function DashboardLayout({ children }) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <Sidebar />
        <div className="pl-64">
          <Header />
          <main className="p-6">{children}</main>
        </div>
      </div>
    );
}
  
