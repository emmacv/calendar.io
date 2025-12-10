import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import './App';
import router from './routing';
import { store } from './store';

const App = () => (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

export default App;
