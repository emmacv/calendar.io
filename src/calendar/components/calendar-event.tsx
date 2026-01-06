import type { EventProps } from 'react-big-calendar';
import type { CalendarEvent } from '../models/CalendarEvent';

const CalendarEvent = (props: EventProps<CalendarEvent>) => {
  return (
    <div>
      <strong>
        {props.title} - {props.event.user?.name}
      </strong>
    </div>
  );
};

export default CalendarEvent;
