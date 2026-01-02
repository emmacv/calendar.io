import Calendar from '@/calendar/components/calendar';
import EventModal from '@/calendar/components/event-modal';
import FabAddEvent from '@/calendar/components/fab-add-event';
import FabDeleteEvent from '@/calendar/components/fab-delete-event';
import NavBar from '@/calendar/components/navbar';
import useCalendarStore from '@/calendar/hooks/useCalendarStore';
import { MODAL_MODE_TYPES } from '@/calendar/types/modal-mode';
import useUiStore from '@/hooks/useUiStore';
import { useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { CalendarEvent } from '../../types/calendar';

export default function CalendarPage() {
  const { handleSelectEvent, activeEvent, startLoadingEvents } =
    useCalendarStore();
  const { handleOpenModal } = useUiStore();

  const handleDoubleClickEvent = (event: CalendarEvent) => {
    handleSelectEvent(event);
    handleOpenModal(MODAL_MODE_TYPES.EDIT);
  };

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    console.log('Slot selected:', slotInfo);
  };

  useEffect(() => {
    startLoadingEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
