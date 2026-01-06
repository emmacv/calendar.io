import Calendar from '@/calendar/components/calendar';
import DeleteEventDialog from '@/calendar/components/delete-event-dialog';
import EventModal from '@/calendar/components/event-modal';
import FabAddEvent from '@/calendar/components/fab-add-event';
import FabDeleteEvent from '@/calendar/components/fab-delete-event';
import NavBar from '@/calendar/components/navbar';
import { MODAL_MODE_TYPES } from '@/calendar/constants/modal-mode';
import useCalendarStore from '@/calendar/hooks/useCalendarStore';
import useUiStore from '@/hooks/useUiStore';
import { useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { CalendarEvent } from '../../models/CalendarEvent';
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
      <DeleteEventDialog />
      <>
        <FabAddEvent />
        {activeEvent && <FabDeleteEvent />}
      </>
    </>
  );
}
