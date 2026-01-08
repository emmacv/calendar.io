import useAuth from '@/hooks/useAuth';
import { Navigate } from 'react-router';

type ProtectedRouteProps = {
  element: React.ReactNode;
};

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { isLoggedIn } = useAuth();
  console.log('ProtectedRoute: isLoggedIn =', isLoggedIn);

  if (!isLoggedIn) return <Navigate to="/auth/login" replace />;

  return element;
};

export default ProtectedRoute;
