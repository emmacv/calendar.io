import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import useCalendarStore from '../hooks/useCalendarStore';

type Props = React.ComponentProps<typeof Button>;

const FabDeleteEvent = (props: Props) => {
  const { startDeleteEvent } = useCalendarStore();

  return (
    <Button
      {...props}
      className="fixed left-8 bottom-8 shadow-lg rounded-full! w-14 h-14 bg-red-600 text-white hover:bg-red-700"
      variant="outline"
      onClick={startDeleteEvent}
    >
      <TrashIcon />
    </Button>
  );
};

export default FabDeleteEvent;
