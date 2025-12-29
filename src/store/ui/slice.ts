import type { MODAL_MODE_TYPES } from '@/calendar/types/modal-mode';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  mode: 'add' as MODAL_MODE_TYPES,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
