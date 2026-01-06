import type { FirebaseCalendarEvent } from '@/api/models/FirebaseCalendarEvent';
import { useFirebase } from '@/hooks/useFirebase';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { CALENDAR_EVENTS_COLLECTION } from '../constants/calendar';
import type { CalendarEvent } from '../models/CalendarEvent';
import useCalendarStore from './useCalendarStore';

export const useUpsertEvent = () => {
  const { db } = useFirebase();
  const { startAddEvent, startUpdateEvent } = useCalendarStore();

  const eventsCol = collection(db, CALENDAR_EVENTS_COLLECTION);

  // TODO: Check if there is a way to optimistic update the store using useOptimistic
  const addEvent = async (event: CalendarEvent) => {
    try {
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

  const updateEvent = async (event: CalendarEvent) => {
    try {
      const { _id, ...rest } = event;
      const eventDoc = doc(db, CALENDAR_EVENTS_COLLECTION, _id);

      // TODO: wire actual user id from auth when available
      const updatedEvent: FirebaseCalendarEvent = {
        ...rest,
        start: rest.start.getTime(),
        end: rest.end.getTime(),
      };

      // Set the "capital" field of the city 'DC'
      await updateDoc(eventDoc, updatedEvent);

      startUpdateEvent(event);
    } catch (error) {
      console.error('Failed to update event in Firestore', error);

      throw error;
    }
  };

  return { addEvent, updateEvent };
};
