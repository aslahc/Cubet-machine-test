import { createSlice } from "@reduxjs/toolkit";

const PostSlice = createSlice({
  name: "postData",
  initialState: {
    items: [],
  },
  reducers: {
    addPost: (state, action) => {
      state.items.push(action.payload);
    },
    likePost: (state, action) => {
      const post = state.items.find((post) => post.id === action.payload);
      if (post) {
        post.likes = (post.likes || 0) + 1;
      }
    },
    unlikePost: (state, action) => {
      const post = state.items.find((post) => post.id === action.payload);
      if (post && post.likes > 0) {
        post.likes -= 1;
      }
    },
  },
});

export const { addPost, likePost, unlikePost } = PostSlice.actions;

export default PostSlice.reducer;
