import type { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import type { CalendarEvent } from '../types/calendar';

const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { activeEvent, events } = useSelector(
    (state: RootState) => state.calendar
  );

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

  const startDeleteEvent = () => {
    dispatch({ type: 'calendar/deleteEvent' });
  };

  return {
    activeEvent,
    events: events.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    })),
    handleSelectEvent,
    startAddEvent,
    startDeleteEvent,
  };
};

export default useCalendarStore;
