import type { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import type { CalendarEvent } from '../types/calendar';

const useCalendarStore = () => {
  const dispatch = useDispatch();
  const calendarState = useSelector((state: RootState) => state.calendar);

  const handleAddEvent = (event: CalendarEvent) => {
    dispatch({ type: 'calendar/addEvent', payload: event });
  };

  return { ...calendarState, handleAddEvent };
};

export default useCalendarStore;
