import CalendarPage from '@/calendar/pages/calendar';
import { createBrowserRouter } from 'react-router';
import { Login, Register } from '../auth';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './protected-route';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute element={<CalendarPage />} />,
  },
  {
    path: 'auth',
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

export default router;
