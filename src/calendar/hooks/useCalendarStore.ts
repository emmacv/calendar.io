import type { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import type { CalendarEvent } from '../types/calendar';

const useCalendarStore = () => {
  const dispatch = useDispatch();
  const calendarState = useSelector((state: RootState) => state.calendar);

  const handleSelectEvent = (event: CalendarEvent) => {
    dispatch({ type: 'calendar/selectEvent', payload: event });
  };

  return { ...calendarState, handleSelectEvent };
};

export default useCalendarStore;
