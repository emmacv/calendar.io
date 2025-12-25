import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import './App';
import FirebaseProvider from './context/firebase';
import router from './routing';
import { store } from './store';

import './config/firebase';

const App = () => (
  <Provider store={store}>
    <FirebaseProvider>
      <RouterProvider router={router} />
    </FirebaseProvider>
  </Provider>
);

export default App;
