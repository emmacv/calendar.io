import type { EventProps } from "react-big-calendar";

const CalendarEvent = (props: EventProps) => {
  return (
    <div>
      <strong>
        {props.title} - {props.event.user.name}
      </strong>
    </div>
  );
};

export default CalendarEvent;
