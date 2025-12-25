import { useContext } from 'react';
import { FirebaseContext, type FirebaseContextValue } from '../context/firebase';

export const useFirebase = (): FirebaseContextValue => {
  const ctx = useContext(FirebaseContext);
  if (!ctx) throw new Error('useFirebase must be used within FirebaseProvider');
  return ctx;
};
