import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setOpenSidebar: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setOpenSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
