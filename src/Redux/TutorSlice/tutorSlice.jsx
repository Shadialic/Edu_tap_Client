import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  tutorInfo: {},
};

export const tutorSlice = createSlice({
  name: "tutor",
  initialState: INITIAL_STATE,
  reducers: {
    setTutorDetailes: (state, action) => {
      state.tutorInfo = action.payload;
      console.log(action.payload, "-----------------------------------");
    },
    logoutDetails: (state) => {
      return INITIAL_STATE;
    },
  },
});

export const { setTutorDetailes, logoutDetails } = tutorSlice.actions;

export default tutorSlice.reducer;
