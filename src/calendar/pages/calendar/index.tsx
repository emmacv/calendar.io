import Calendar from '@/calendar/components/calendar';
import NavBar from '@/calendar/components/navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function CalendarPage() {
  return (
    <>
      <NavBar />
      <Calendar />
    </>
  );
}
