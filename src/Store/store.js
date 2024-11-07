import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import loadingSlice from "./Slices/loaderSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    loader: loadingSlice,
  },
});

export default store;
