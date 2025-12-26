import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';
import type { CalendarState } from '../types/calendar';

const events = [
  {
    _id: new Date().getTime(),
    title: 'Cumpleaños de Ana',
    start: new Date().getTime(),
    end: addHours(new Date(), 5).getTime(),
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
    addEvent(state, action) {
      state.events.push(action.payload);
      state.activeEvent = null;
    },
    updateEvent(state, action) {
      const currentEventIndex = state.events.findIndex(
        (event) => event._id === action.payload._id
      );

      if (currentEventIndex !== -1) {
        state.events[currentEventIndex] = action.payload;
      }
    },
    deleteEvent(state) {
      state.events = state.events.filter(
        (event) => event._id !== state.activeEvent?._id
      );
      state.activeEvent = null;
    },
  },
});

export const { selectEvent, addEvent, updateEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
