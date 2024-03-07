import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  title: "",
  payment: "",
  price: "",
  description: "",
  category: "",
  level: "",
  image: "",
};

const CourseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseDetailes: (state, action) => {
      (state.id = action.payload.id),
        (state.title = action.payload.title),
        (state.payment = action.payload.payment),
        (state.price = action.payload.price),
        (state.category = action.payload.category),
        (state.description = action.payload.description),
        (state.image = action.payload.image),
        (state.level = action.payload.level);
    },
  },
});

export const { setCourseDetailes } = CourseSlice.actions;
export default CourseSlice.reducer;
