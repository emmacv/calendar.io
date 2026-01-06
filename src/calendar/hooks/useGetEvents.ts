import type { FirebaseCalendarEvent } from '@/api/models/FirebaseCalendarEvent';
import { useFirebase } from '@/hooks/useFirebase';
import { collection, getDocs } from 'firebase/firestore';
import { CALENDAR_EVENTS_COLLECTION } from '../constants/calendar';
import type { CalendarEvent } from '../models/CalendarEvent';

const useGetEvents = () => {
  const { db } = useFirebase();

  const getEvents = async (): Promise<CalendarEvent[]> => {
    const eventsCol = collection(db, CALENDAR_EVENTS_COLLECTION);
    const snapshot = await getDocs(eventsCol);

    const events: CalendarEvent[] = snapshot.docs.map((doc) => {
      const data = doc.data() as FirebaseCalendarEvent;

      return {
        ...data,
        start: new Date(data.start),
        end: new Date(data.end),
        _id: doc.id,
      };
    });

    return events;
  };

  return getEvents;
};

export default useGetEvents;
