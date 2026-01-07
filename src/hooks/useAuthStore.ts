import { useDispatch, useSelector } from 'react-redux';

const useAuthStore = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const isLoggedIn = !!user;

  const logIn = (userData: any) => {
    dispatch({ type: 'auth/logIn', payload: userData });
  };

  const logOut = () => {
    dispatch({ type: 'auth/logOut' });
  };

  return {
    user,
    isLoggedIn,
    logIn,
    logOut,
  };
};

export default useAuthStore;
