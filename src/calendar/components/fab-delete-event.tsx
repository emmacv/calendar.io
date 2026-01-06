import Fab from '@/components/fab';
import { Button } from '@/components/ui/button';
import useUiStore from '@/hooks/useUiStore';
import { TrashIcon } from 'lucide-react';

type Props = React.ComponentProps<typeof Button>;

const FabDeleteEvent = (props: Props) => {
  const { handleOpenAlert } = useUiStore();

  return (
    <Fab
      {...props}
      className="fixed left-8 bottom-8 shadow-lg rounded-full! w-14 h-14 bg-red-600 text-white hover:bg-red-700"
      variant="outline"
      onClick={handleOpenAlert}
      icon={TrashIcon}
    />
  );
};

export default FabDeleteEvent;
