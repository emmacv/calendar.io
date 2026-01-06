import { Button } from '@/components/ui/button';
import { useFirebase } from '@/hooks/useFirebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { TrashIcon } from 'lucide-react';
import { toast } from 'sonner';
import { CALENDAR_EVENTS_COLLECTION } from '../const/calendar';
import useCalendarStore from '../hooks/useCalendarStore';

type Props = React.ComponentProps<typeof Button>;

const FabDeleteEvent = (props: Props) => {
  const { db } = useFirebase();
  const { startDeleteEvent, activeEvent } = useCalendarStore();

  const handleDeleteEvent = async () => {
    if (!activeEvent) return;

    try {
      const eventId = activeEvent._id;
      await deleteDoc(doc(db, CALENDAR_EVENTS_COLLECTION, eventId));

      startDeleteEvent();
      toast.success('Event deleted successfully.');
    } catch (error) {
      toast.error('Failed to delete event. Please try again.');
      console.error('Error deleting event:', error);
    }
  };

  return (
    <Button
      {...props}
      className="fixed left-8 bottom-8 shadow-lg rounded-full! w-14 h-14 bg-red-600 text-white hover:bg-red-700"
      variant="outline"
      onClick={handleDeleteEvent}
    >
      <TrashIcon />
    </Button>
  );
};

export default FabDeleteEvent;
