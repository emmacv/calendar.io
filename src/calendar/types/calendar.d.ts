type CalendarEvent = {
  _id: string;
  title: string;
  notes?: string;
  start: Date;
  end: Date;
  bgColor?: string;
};

type CalendarState = {
  events: CalendarEvent[];
  activeEvent: CalendarEvent | null;
  isLoading: boolean;
};

export type { CalendarEvent, CalendarState };
