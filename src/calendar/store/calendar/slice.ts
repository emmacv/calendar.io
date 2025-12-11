import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

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

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events,
    activeEvent: null,
  },
  reducers: {
    setActiveEvent(state, action) {
      state.activeEvent = action.payload;
    },
  },
});

export const { setActiveEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
