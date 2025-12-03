import { CalendarPage } from "@/calendar";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router";
import { Login, Register } from "../auth";
import NotFound from "../pages/NotFound";

function RootLayout() {
  return (
    <div>
      <nav style={{ padding: 12, borderBottom: "1px solid #eee" }}>
        <Link to="/">Home</Link> | <Link to="/calendar">Calendar</Link> |{" "}
        <Link to="/auth/login">Login</Link>
      </nav>
      <main style={{ padding: 12 }}>
        <Outlet />
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    // element: <RootLayout />,
    children: [
      { index: true, element: <CalendarPage /> },
      // { path: 'calendar', element: <CalendarView /> },
      {
        path: "auth",
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
