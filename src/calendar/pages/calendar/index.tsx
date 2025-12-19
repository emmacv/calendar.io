import Calendar from '@/calendar/components/calendar';
import EventModal from '@/calendar/components/event-modal';
import FabAddEvent from '@/calendar/components/fab-add-event';
import FabDeleteEvent from '@/calendar/components/fab-delete-event';
import NavBar from '@/calendar/components/navbar';
import useCalendarStore from '@/calendar/hooks/useCalendarStore';
import type { CalendarEvent } from '@/calendar/types/calendar';
import useUiStore from '@/hooks/useUiStore';
import type { View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function CalendarPage() {
  const { handleSelectEvent, activeEvent } = useCalendarStore();
  const { handleOpenModal } = useUiStore();

  const handleDoubleClickEvent = (event: CalendarEvent) => {
    handleSelectEvent(event);
    handleOpenModal();
  };

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    console.log('Slot selected:', slotInfo);
  };

  const handleChangeView = (view: View) => {
    localStorage.setItem('lastView', view);
  };

  return (
    <>
      <NavBar />
      <Calendar
        handleDoubleClickEvent={handleDoubleClickEvent}
        handleSelectSlot={handleSelectSlot}
        handleChangeView={handleChangeView}
      />
      <EventModal />
      <>
        <FabAddEvent />
        {activeEvent && <FabDeleteEvent />}
      </>
    </>
  );
}
