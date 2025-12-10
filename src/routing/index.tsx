import { CalendarPage } from '@/calendar';
import { createBrowserRouter } from 'react-router';
import { Login, Register } from '../auth';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    // element: <RootLayout />,
    children: [
      { index: true, element: <CalendarPage /> },
      // { path: 'calendar', element: <CalendarView /> },
      {
        path: 'auth',
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
