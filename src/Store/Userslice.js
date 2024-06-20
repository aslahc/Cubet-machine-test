import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userData",
  initialState: {
    items: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.items.push(action.payload);
    },
    followUser: (state, action) => {
      const { userId, id } = action.payload;
      const userToUpdate = state.items.find((user) => user.id === id);
      if (userToUpdate) {
        if (!userToUpdate.followers) {
          userToUpdate.followers = [];
        }
        userToUpdate.followers.push(userId);
      }
    },
  },
});

export const { addUser, followUser } = userSlice.actions;

export default userSlice.reducer;
