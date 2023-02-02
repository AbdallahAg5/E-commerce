import { createSlice } from "@reduxjs/toolkit";

export const QuestionReducer = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    answer: [],
    trace: 0,
  },
  reducers: {
    startExam: (state, action) => {
      return { ...state, questions: action.payload };
    },
    next: (state, action) => {
      return { ...state, trace: state.trace + 1 };
    },
    prev: (state, action) => {
      return { ...state, trace: state.trace - 1 };
    },
    resetAll: (state, action) => {
      return { questions: [], answer: [], trace: 0 };
    },
  },
});

export const { startExam, next, prev ,resetAll} = QuestionReducer.actions;
export default QuestionReducer.reducer;
