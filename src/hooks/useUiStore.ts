import type { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';

const useUiStore = () => {
  const { isModalOpen } = useSelector<RootState, RootState['ui']>(
    (state) => state.ui
  );

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch({ type: 'ui/openModal' });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'ui/closeModal' });
  };

  return { isModalOpen, handleOpenModal, handleCloseModal };
};

export default useUiStore;
