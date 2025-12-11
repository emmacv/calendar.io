import localizer from '@/lib/localizer';
import { useState } from 'react';
import { type View, Calendar as MainCalendar } from 'react-big-calendar';
import useCalendarStore from '../hooks/useCalendarStore';
import type { CalendarEvent as CalendarEventType } from '../types/calendar';
import CalendarEvent from './calendar-event';

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

type Props = {
  handleDoubleClickEvent: (event: CalendarEventType) => void;
  handleSelectSlot: (slotInfo: { start: Date; end: Date }) => void;
  handleChangeView: (view: View) => void;
};

const Calendar = ({
  handleDoubleClickEvent,
  handleSelectSlot,
  handleChangeView,
}: Props) => {
  const [defaultView] = useState<View>(() => {
    const lastView = localStorage.getItem('lastView') as View;
    return lastView || 'month';
  });
  const { events, handleSelectEvent } = useCalendarStore();

  return (
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
  );
};

export default Calendar;
