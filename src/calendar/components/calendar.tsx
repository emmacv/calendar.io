import localizer from '@/lib/localizer';
import { useState } from 'react';
import { type View, Calendar as RBCalendar, Views } from 'react-big-calendar';
import useCalendarStore from '../hooks/useCalendarStore';
import type { CalendarEvent as CalendarEventType } from '../types/calendar';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore CalendarEvent component is typed correctly
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

type Props = {
  handleDoubleClickEvent: (event: CalendarEventType) => void;
};

const Calendar = ({ handleDoubleClickEvent }: Props) => {
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
    <RBCalendar
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      defaultView={defaultView}
      style={{ height: '100vh' }}
      events={events}
      messages={messages}
      components={{
        event: CalendarEvent,
      }}
      onView={handleChangeView}
      onSelectEvent={handleSelectEvent}
      onDoubleClickEvent={handleDoubleClickEvent}
      selectable
      view={currentView}
      onNavigate={setCurrentDate}
      date={currentDate}
    />
  );
};

export default Calendar;
