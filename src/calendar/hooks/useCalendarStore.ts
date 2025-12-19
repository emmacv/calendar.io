import type { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import type { CalendarEvent } from '../types/calendar';

const useCalendarStore = () => {
  const dispatch = useDispatch();
  const calendarState = useSelector((state: RootState) => state.calendar);

  const handleSelectEvent = (event: CalendarEvent | null) => {
    dispatch({ type: 'calendar/selectEvent', payload: event });
  };

  // TODO: Drop in favor of redux thunk
  const startAddEvent = async (event: CalendarEvent) => {
    const dispatchArg = event._id
      ? { type: 'calendar/updateEvent', payload: event }
      : {
          type: 'calendar/addEvent',
          // TODO: Replace with UUID generation
          payload: { ...event, _id: new Date().getTime() },
        };

    dispatch(dispatchArg);
  };

  return { ...calendarState, handleSelectEvent, startAddEvent };
};

export default useCalendarStore;
