import Calendar from '@/calendar/components/calendar';
import EventModal from '@/calendar/components/event-modal';
import FabAddEvent from '@/calendar/components/fab-add-event';
import FabDeleteEvent from '@/calendar/components/fab-delete-event';
import NavBar from '@/calendar/components/navbar';
import useCalendarStore from '@/calendar/hooks/useCalendarStore';
import type { CalendarEvent } from '@/calendar/types/calendar';
import { useFirebase } from '@/hooks/useFirebase';
import useUiStore from '@/hooks/useUiStore';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function CalendarPage() {
  const { handleSelectEvent, activeEvent } = useCalendarStore();
  const { handleOpenModal } = useUiStore();

  const { db } = useFirebase();

  const handleDoubleClickEvent = (event: CalendarEvent) => {
    handleSelectEvent(event);
    handleOpenModal();
  };

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    console.log('Slot selected:', slotInfo);
  };

  useEffect(() => {
    async function getCities() {
      const events = collection(db, 'events');
      const citySnapshot = await getDocs(events);
      const eventsList = citySnapshot.docs.map((doc) => doc.data());

      console.log(eventsList);
      return eventsList;
    }

    getCities();
  }, [db]);

  return (
    <>
      <NavBar />
      <Calendar
        handleDoubleClickEvent={handleDoubleClickEvent}
        handleSelectSlot={handleSelectSlot}
      />
      <EventModal />
      <>
        <FabAddEvent />
        {activeEvent && <FabDeleteEvent />}
      </>
    </>
  );
}
