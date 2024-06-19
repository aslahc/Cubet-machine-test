import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Userslice"; // Adjust path based on your project structure

const store = configureStore({
  reducer: {
    userData: userReducer, // Include userSlice reducer in the store
    // Add other reducers here if needed
  },
});

export default store;
