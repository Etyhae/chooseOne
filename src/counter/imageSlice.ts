import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

export interface randImage {
  value: any[];
}

const initialState: randImage = {
  value: [],
};

export const imageSlice = createSlice({
  name: "randImage",
  initialState,
  reducers: {
    setImages: (state, action) => {
      state.value = action.payload;
    },
    addImage: (state, action) => {
      state.value.push(action.payload);
    },
    uncheck: (state) => {
      state.value.map((item) => {
        item.checked = false;
      });
    },
    chooseImage: (state, action) => {
      const index = state.value.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.value[index].checked = true;
      } else {
        console.error(`No item with id ${action.payload.id} found.`);
      }
    },
    filter: (state) => {
      state.value = state.value.filter((item) => item.checked === true);
    },
  },
});

export const { setImages, addImage, chooseImage, filter, uncheck } = imageSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default imageSlice.reducer;
