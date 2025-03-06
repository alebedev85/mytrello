// store/boardSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PopupState, targetId } from "../types";

const initialState: PopupState = {
  isOpen: false,
  type: null,
  targetId: null,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openPopup(
      state,
      action: PayloadAction<{ type: "column" | "task"; targetId: targetId }>
    ) {
      state.isOpen = true;
      state.type = action.payload.type;
      state.targetId = action.payload.targetId;
    },
    closePopup(state) {
      state.isOpen = false;
      state.type = null;
      state.targetId = null;
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;
