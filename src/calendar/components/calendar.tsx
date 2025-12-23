import localizer from '@/lib/localizer';
import { useState } from 'react';
import { type View, Calendar as MainCalendar, Views } from 'react-big-calendar';
import useCalendarStore from '../hooks/useCalendarStore';
import type { CalendarEvent as CalendarEventType } from '../types/calendar';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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
};

const Calendar = ({ handleDoubleClickEvent, handleSelectSlot }: Props) => {
  const [defaultView] = useState<View>(() => {
    const lastView = localStorage.getItem('lastView') as View;
    return lastView || Views.MONTH;
  });
  const [currentView, setCurrentView] = useState<View>(defaultView);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { events, handleSelectEvent } = useCalendarStore();

  const handleChangeView = (view: View) => {
    setCurrentView(view);
    localStorage.setItem('lastView', view);
  };

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
      view={currentView}
      onNavigate={setCurrentDate}
      date={currentDate}
    />
  );
};

export default Calendar;
