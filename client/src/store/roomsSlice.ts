import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RoomsState {
  id: number;
}

const initialState: RoomsState = {
  id: 1,
};

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    change: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
  },
});

export const { change } = roomsSlice.actions;

export default roomsSlice.reducer;
