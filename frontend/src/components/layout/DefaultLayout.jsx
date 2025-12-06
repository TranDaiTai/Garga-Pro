// src/components/layout/DefaultLayout.jsx
import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';

const DefaultLayout = ({ children }) => {
  return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        {/* Nội dung trang sẽ được nhét vào đây */}
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        
      </div>
    
  );
};

export default DefaultLayout;