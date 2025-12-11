import calendarReducer from '@/calendar/store/slice';
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui/slice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    calendar: calendarReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export { uiReducer, type RootState };
