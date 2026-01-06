import Fab from '@/components/fab';
import { Button } from '@/components/ui/button';
import useUiStore from '@/hooks/useUiStore';
import { CrossIcon } from 'lucide-react';
import { MODAL_MODE_TYPES } from '../constants/modal-mode';

type Props = React.ComponentProps<typeof Button>;

const FabAddEvent = (props: Props) => {
  const { handleOpenModal } = useUiStore();

  const onOpenModal = () => {
    handleOpenModal(MODAL_MODE_TYPES.ADD);
  };

  return (
    <Fab
      {...props}
      className="fixed right-8 bottom-8 shadow-lg rounded-full! w-14 h-14 z-50"
      variant="outline"
      onClick={onOpenModal}
      id="fab-add-event"
      icon={CrossIcon}
    />
  );
};

export default FabAddEvent;
