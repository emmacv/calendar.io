import type { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import type { CalendarEvent } from '../types/calendar';
import useGetEvents from './useGetEvents';

const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { activeEvent, events } = useSelector(
    (state: RootState) => state.calendar
  );
  const getEvents = useGetEvents();

  const handleSelectEvent = (event: CalendarEvent | null) => {
    dispatch({ type: 'calendar/selectEvent', payload: event });
  };

  // TODO: Drop in favor of redux thunk
  const startAddEvent = async (event: CalendarEvent) => {
    dispatch({
      type: 'calendar/addEvent',
      payload: { ...event },
    });
  };

  const startUpdateEvent = async (event: CalendarEvent) => {
    dispatch({ type: 'calendar/updateEvent', payload: event });
  };

  const startDeleteEvent = () => {
    dispatch({ type: 'calendar/deleteEvent' });
  };

  const startLoadingEvents = async () => {
    const events = await getEvents();

    dispatch({ type: 'calendar/loadEvents', payload: events });
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
    startUpdateEvent,
    startLoadingEvents,
  };
};

export default useCalendarStore;
