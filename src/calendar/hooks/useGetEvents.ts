import type { FirebaseCalendarEvent } from '@/api/models/FirebaseCalendarEvent';
import { useFirebase } from '@/hooks/useFirebase';
import { collection, getDocs } from 'firebase/firestore';
import type { CalendarEvent } from '../types/calendar';

const useGetEvents = () => {
  const { db } = useFirebase();

  const getEvents = async (): Promise<CalendarEvent[]> => {
    const eventsCol = collection(db, 'events');
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
