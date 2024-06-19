import { createSlice } from "@reduxjs/toolkit";

const LoggeduserSlice = createSlice({
  name: "userData",
  initialState: {
    items: [], // Assuming you want to store multiple users; adjust as needed
  },
  reducers: {
    addLoggedUser: (state, action) => {
      state.items.push(action.payload); // Add user data to the state
    },
    updateLoggedUser: (state, action) => {
      const { updatedData } = action.payload;

      // Assuming you have multiple items in state.items and you want to update the first item
      state.items[0] = {
        ...state.items[0], // Keep existing properties of the first item
        ...updatedData, // Overwrite with updatedData
      };
    },
    resetLoggedUser: (state) => {
      state.items = []; // Reset items to empty array
    },
  },
});

export const { addLoggedUser, updateLoggedUser, resetLoggedUser } =
  LoggeduserSlice.actions;

export default LoggeduserSlice.reducer;
