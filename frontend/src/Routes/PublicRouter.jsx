// src/Routes/AppRoutes.jsx

import Home from '../pages/Home';
import Booking from '../pages/Booking';
import services from '../pages/services';
import ServiceDetail from '../pages/services/[id]';
import NotFound from '../pages/Notfound';
import { Layout } from 'lucide-react';
import SeasonalLayout from '@/components/layout/SeasonalLayout';
import LoginPage from '@/pages/auth/login/Login';
import DefaultLayout from '@/components/layout/DefaultLayout';



const publicRoutes = [
  { 
    path: '/', 
    component: Home, 
    layout: SeasonalLayout,
    exact: true 
  },
  { 
    path: '/booking', 
    component: Booking, 
    layout: SeasonalLayout 
  },
  { 
    path: '/services', 
    component: services, 
    layout: SeasonalLayout 
  },
  { 
    path: '/services/:id', 
    component: ServiceDetail, 
    layout: SeasonalLayout 
  },
  { 
    path: '*', 
    component: NotFound,
    layout:DefaultLayout // Không cần layout cho 404
  }
];

export default publicRoutes;