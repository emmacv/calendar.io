import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Calendar, Clock, User } from 'lucide-react';
import { useImperativeHandle, useState } from 'react';
import { type Event } from 'react-big-calendar';

// Add this before the EventModal component
export type EventModalRef = {
  open: () => void;
  close: () => void;
};

type EventModalProps = {
  event: Event | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  ref?: React.Ref<EventModalRef>;
};

const formatDate = (date: Date | undefined) => {
  if (!date) return '';

  return format(date, 'PPP');
};

const formatTime = (date: Date | undefined) => {
  if (!date) return '';

  return format(date, 'p');
};

const isSameDay = (start: Date | undefined, end: Date | undefined) => {
  if (!start || !end) return false;

  return format(start, 'yyyy-MM-dd') === format(end, 'yyyy-MM-dd');
};

const EventModal = ({ event, open, onOpenChange, ref }: EventModalProps) => {
  const [openState, setOpenState] = useState(open);
  const isForwardedRef = !!ref;
  const finalOpen = isForwardedRef ? openState : open;

  const handleOpenChange = (isOpen: boolean) => {
    if (isForwardedRef) {
      setOpenState(isOpen);
    } else if (onOpenChange) {
      onOpenChange(isOpen);
    }
  };

  useImperativeHandle(ref, () => ({
    open: () => handleOpenChange(true),
    close: () => handleOpenChange(false),
  }));

  if (!event) return null;

  return (
    <Dialog open={finalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{event.title}</DialogTitle>
          <DialogDescription>Event details and information</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Date and Time Section */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Date</p>
                {isSameDay(event.start, event.end) ? (
                  <p className="text-sm text-muted-foreground">
                    {formatDate(event.start)}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {formatDate(event.start)} - {formatDate(event.end)}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Time</p>
                <p className="text-sm text-muted-foreground">
                  {formatTime(event.start)} - {formatTime(event.end)}
                </p>
              </div>
            </div>

            {event.user && (
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Organizer</p>
                  <p className="text-sm text-muted-foreground">
                    {event.user.name}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Color Indicator */}
          {event.bgColor && (
            <div className="flex items-center gap-3 pt-2">
              <div
                className="h-6 w-6 rounded-full border-2 border-border"
                style={{ backgroundColor: event.bgColor }}
              />
              <p className="text-sm text-muted-foreground">Event color</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
