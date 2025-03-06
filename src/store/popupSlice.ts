import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PopupState {
  addColumnModal: {
    isOpen: boolean;
  };
  confirmationModal: {
    isOpen: boolean;
    type: "column" | "task" | null;
    targetId: { taskId: string; columnId: string } | null;
  };
}

const initialState: PopupState = {
  addColumnModal: {
    isOpen: false,
  },
  confirmationModal: {
    isOpen: false,
    type: null,
    targetId: null,
  },
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openAddColumnModal(state) {
      state.addColumnModal.isOpen = true;
    },
    closeAddColumnModal(state) {
      state.addColumnModal.isOpen  = false;
    },
    openConfirmationModal(
      state,
      action: PayloadAction<{
        type: "column" | "task";
        targetId: { taskId: string; columnId: string };
      }>
    ) {
      state.confirmationModal.isOpen = true;
      state.confirmationModal.type = action.payload.type;
      state.confirmationModal.targetId = action.payload.targetId;
    },
    closeConfirmationModal(state) {
      state.confirmationModal.isOpen = false;
      state.confirmationModal.type = null;
      state.confirmationModal.targetId = null;
    },
  },
});

export const {
  openAddColumnModal,
  closeAddColumnModal,
  openConfirmationModal,
  closeConfirmationModal,
} = popupSlice.actions;

export default popupSlice.reducer;
