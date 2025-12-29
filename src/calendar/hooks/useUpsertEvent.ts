import { useFirebase } from '@/hooks/useFirebase';
import { addDoc, collection } from 'firebase/firestore';
import type { CalendarEvent } from '../types/calendar';
import useCalendarStore from './useCalendarStore';

export const useUpsertEvent = () => {
  const { db } = useFirebase();
  const { startAddEvent } = useCalendarStore();

  // TODO: Check if there is a way to optimistic update the store using useOptimistic
  const addEvent = async (event: CalendarEvent) => {
    try {
      const eventsCol = collection(db, 'events');

      const newEvent = {
        title: event.title,
        notes: event.notes,
        start: event.start.getTime(),
        end: event.end.getTime(),
        bgColor: 'ff0000',
        // TODO: wire actual user id from auth when available
        userId: '',
      };

      const docRef = await addDoc(eventsCol, newEvent);

      // replace the temporary event in the store with the one that has the real Firestore id
      startAddEvent({ ...event, _id: docRef.id });

      return docRef;
    } catch (error) {
      console.error('Failed to add event to Firestore', error);
      throw error;
    }
  };

  const editEvent = async (event: CalendarEvent) => {};

  return addEvent;
};
