import { Button } from '@/components/ui/button';
import useUiStore from '@/hooks/useUiStore';
import { CrossIcon } from 'lucide-react';

type Props = React.ComponentProps<typeof Button>;

const FabAddEvent = (props: Props) => {
  const { handleOpenModal } = useUiStore();

  return (
    <Button
      {...props}
      className="fixed right-8 bottom-8 shadow-lg rounded-full! w-14 h-14 z-50"
      variant="outline"
      onClick={handleOpenModal}
      id="fab-add-event"
    >
      <CrossIcon />
    </Button>
  );
};

export default FabAddEvent;
