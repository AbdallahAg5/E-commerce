import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

export const ResultReducer = createSlice({
  name: "result",
  initialState: {
    userId: null,
    result: [],
  },
  reducers: {
    setUser: (state, action) => {
      return { ...state, userId: action.payload };
    },
    storeResult: (state, action) => {
      // the produce function is a function of the immer library
      const nextState = produce(state, (draft) => {
        draft.result.push(action.payload);
      });
      return nextState;
    },
    updateResult:(state,action)=>{
         const {trace,checked}=action.payload
         console.log(trace,checked)
         state.result.fill(checked,trace,trace + 1)  
    },
    resetResult: (state, action) => {
      return { userId: null, result: [] };
    },
  },
});

export const { setUser, storeResult,resetResult , updateResult} = ResultReducer.actions;
export default ResultReducer.reducer;
