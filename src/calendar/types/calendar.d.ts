type CalendarEvent = {
  _id: number;
  title: string;
  notes?: string;
  start: Date;
  end: Date;
  bgColor?: string;
  user?: {
    _id: string;
    name: string;
  };
};

type CalendarState = {
  events: CalendarEvent[];
  activeEvent: CalendarEvent | null;
};

export type { CalendarEvent, CalendarState };
