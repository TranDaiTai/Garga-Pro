// src/Routes/AppRoutes.jsx

import Home from '../pages/Home';
import Booking from '../pages/Booking';
import services from '../pages/services';
import ServiceDetail from '../pages/services/[id]';
import NotFound from '../pages/Notfound';
import { Layout } from 'lucide-react';
import SeasonalLayout from '@/components/layout/SeasonalLayout';


const publicRoutes = [
  { path: '/', component: Home, layout:SeasonalLayout},
  {path: '/booking', component:Booking, layout:SeasonalLayout},
  {path: '/services', component: services, layout:SeasonalLayout},
  {path: '/services/:id', component: ServiceDetail, layout:SeasonalLayout},
  {path: '*', component: NotFound },

];

export default publicRoutes;