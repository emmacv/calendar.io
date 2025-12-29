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

enum MODAL_MODE_TYPES {
  EDIT = 'edit',
  ADD = 'add',
}

export type { CalendarEvent, CalendarState, MODAL_MODE_TYPES };
