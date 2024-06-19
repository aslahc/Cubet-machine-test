import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userData",
  initialState: {
    items: [], // Assuming you want to store multiple users; adjust as needed
  },
  reducers: {
    addUser: (state, action) => {
      state.items.push(action.payload); // Add user data to the state
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
