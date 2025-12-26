type CalendarEvent = {
  _id: number;
  title: string;
  notes?: string;
  start: number;
  end: number;
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
