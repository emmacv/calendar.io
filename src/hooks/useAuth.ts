import type { User } from '@/api/models/User';
import type { AuthState } from '@/store/types/AuthSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: AuthState) => state.user);
  const isLoggedIn = !!user;

  const logIn = (userData: User) => {
    dispatch({ type: 'auth/logIn', payload: userData });
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logOut = () => {
    dispatch({ type: 'auth/logOut' });
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      dispatch({ type: 'auth/logIn', payload: JSON.parse(storedUser) as User });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    user,
    isLoggedIn,
    logIn,
    logOut,
  };
};

export default useAuth;
