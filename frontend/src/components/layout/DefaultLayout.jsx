// src/components/layout/DefaultLayout.jsx
import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        {/* Nội dung trang sẽ được nhét vào đây */}
        <main className="flex-1">
          <Outlet/>
        </main>
        <Footer />
        
      </div>
    
  );
};


const DefaultLayoutWithoutFooter = () => {
  return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        {/* Nội dung trang sẽ được nhét vào đây */}
        <main className="flex-1">
          <Outlet/>
        </main>
      </div>
    
  );
};


export { DefaultLayoutWithoutFooter };
export default DefaultLayout;