import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counter/counterSlice";
import imageSlice from "./counter/imageSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    image: imageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
