import calendarReducer from '@/calendar/store/slice';
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui/slice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    calendar: calendarReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

type RootState = ReturnType<typeof store.getState>;

store.subscribe(() => {
  console.log('State updated:', store.getState());
});

export { uiReducer, type RootState };
