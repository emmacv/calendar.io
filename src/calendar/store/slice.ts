import { createSlice } from '@reduxjs/toolkit';
import type { CalendarState } from '../types/calendar';

const initialState: CalendarState = {
  events: [],
  activeEvent: null,
  isLoading: true,
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
    loadEvents(state, action) {
      state.isLoading = false;
      state.events = action.payload;
    },
  },
});

export const { selectEvent, addEvent, updateEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
