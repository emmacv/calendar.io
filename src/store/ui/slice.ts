import type { MODAL_MODE_TYPES } from '@/calendar/constants/modal-mode';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  mode: 'add' as MODAL_MODE_TYPES,
  isAlertOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal(state, action) {
      state.isModalOpen = true;
      state.mode = action.payload;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
    openAlert(state) {
      state.isAlertOpen = true;
    },
    closeAlert(state) {
      state.isAlertOpen = false;
    },
  },
});

export const { openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
