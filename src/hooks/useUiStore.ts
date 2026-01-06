import type { MODAL_MODE_TYPES } from '@/calendar/constants/modal-mode';
import type { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';

const useUiStore = () => {
  const uiState = useSelector<RootState, RootState['ui']>((state) => state.ui);

  const dispatch = useDispatch();

  const handleOpenModal = (mode: MODAL_MODE_TYPES) => {
    dispatch({ type: 'ui/openModal', payload: mode });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'ui/closeModal' });
  };

  const handleOpenAlert = () => {
    dispatch({ type: 'ui/openAlert' });
  };

  const handleCloseAlert = () => {
    dispatch({ type: 'ui/closeAlert' });
  };

  return {
    ...uiState,
    handleOpenModal,
    handleCloseModal,
    handleOpenAlert,
    handleCloseAlert,
  };
};

export default useUiStore;
