type CalendarEvent = {
  _id: string;
  title: string;
  notes?: string;
  start: Date;
  end: Date;
  bgColor?: string;
  userId: string;
};

export type { CalendarEvent };
