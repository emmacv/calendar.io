import useUiStore from '@/hooks/useUiStore';
import localizer from '@/lib/localizer';
import { useState } from 'react';
import {
  type Event,
  type View,
  Calendar as MainCalendar,
} from 'react-big-calendar';
import useCalendarStore from '../hooks/useCalendarStore';
import CalendarEvent from './calendar-event';
import EventModal from './event-modal';

const messages = {
  allDay: 'Todo el día',
  previous: '<',
  next: '>',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'No hay eventos en este rango',
  showMore: (total: number) => `+ Ver más (${total})`,
};

const eventPropsGetter = () => {
  return {
    className: 'bg-gray-800 text-white p-2 rounded-md',
    style: {
      height: '100%',
    },
  };
};

const Calendar = () => {
  const [defaultView] = useState<View>(() => {
    const lastView = localStorage.getItem('lastView') as View;
    return lastView || 'month';
  });
  const { events } = useCalendarStore();

  // const ref = useRef<EventModalRef>(null);
  const { isModalOpen, handleOpenModal, handleCloseModal } = useUiStore();

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleSelectEvent = (event: (typeof events)[0]) => {
    setSelectedEvent(event);
  };

  const handleDoubleClickEvent = (event: (typeof events)[0]) => {
    setSelectedEvent(event);
    handleOpenModal();
    // ref.current?.open();
  };

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    console.log('Slot selected:', slotInfo);
  };

  const handleChangeView = (view: View) => {
    localStorage.setItem('lastView', view);
  };

  return (
    <>
      <MainCalendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        defaultView={defaultView}
        style={{ height: '100vh' }}
        events={events}
        messages={messages}
        eventPropGetter={eventPropsGetter}
        components={{
          event: CalendarEvent,
        }}
        onView={handleChangeView}
        onSelectEvent={handleSelectEvent}
        onDoubleClickEvent={handleDoubleClickEvent}
        onSelectSlot={handleSelectSlot}
        selectable
      />
      <EventModal
        event={selectedEvent}
        open={isModalOpen}
        onOpenChange={handleCloseModal}
      />
    </>
  );
};

export default Calendar;
