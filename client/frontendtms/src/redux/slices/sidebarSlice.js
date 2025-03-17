import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false, 
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { setOpenSidebar, toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
