import { firebaseConfig } from '@/config/firebase';
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import React, { createContext, useState } from 'react';

export type FirebaseContextValue = {
  app: FirebaseApp;
  db: Firestore;
};

export const FirebaseContext = createContext<FirebaseContextValue | null>(null);

const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [app] = useState(() => initializeApp(firebaseConfig));
  const [db] = useState(() => getFirestore(app));

  return <FirebaseContext value={{ app, db }}>{children}</FirebaseContext>;
};

export default FirebaseProvider;
