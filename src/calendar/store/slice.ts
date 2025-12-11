import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';
import type { CalendarState } from '../types/calendar';

const events = [
  {
    _id: new Date().getTime(),
    title: 'Cumpleaños de Ana',
    start: new Date(),
    end: addHours(new Date(), 5),
    bgColor: '#32404f',
    user: {
      name: 'John Doe',
      _id: '1',
    },
  },
];

const initialState: CalendarState = {
  events,
  activeEvent: null,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    selectEvent(state, action) {
      state.activeEvent = action.payload;
    },
  },
});

export const { selectEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
