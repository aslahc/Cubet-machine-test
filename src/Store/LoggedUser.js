import { createSlice } from "@reduxjs/toolkit";

const LoggedUserSlice = createSlice({
  name: "loggedUserData",
  initialState: {
    items: [],
  },
  reducers: {
    addLoggedUser: (state, action) => {
      state.items.push(action.payload);
    },
    updateLoggedUser: (state, action) => {
      const { updatedData } = action.payload;
      if (state.items.length > 0) {
        state.items[0] = {
          ...state.items[0],
          ...updatedData,
        };
      }
    },
    resetLoggedUser: (state) => {
      state.items = [];
    },
    following: (state, action) => {
      const { userId } = action.payload;
      if (state.items.length > 0) {
        state.items[0].following.push(userId);
      }
    },
  },
});

export const { addLoggedUser, updateLoggedUser, resetLoggedUser, following } =
  LoggedUserSlice.actions;

export default LoggedUserSlice.reducer;
