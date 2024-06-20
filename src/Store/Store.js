// src/store/index.js

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import userReducer from "./Userslice";
import logedUserReducer from "./LoggedUser";
import postReducer from "./Post"; // Import your postReducer

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["LoggedUser"], // reducer names to be persisted
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    LoggedUser: logedUserReducer,
    userData: userReducer,
    postData: postReducer, // Include your postReducer here
    // Add other reducers here if needed
  })
);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
