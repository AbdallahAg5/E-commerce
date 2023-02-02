import { createSlice } from "@reduxjs/toolkit";

const LoginReducer = createSlice({
  name: "LoginReducer",
  initialState: {
      name:null,
      isLoggedIn:false
  },
  reducers: {
    testUserAuth: (state, action) => {
      const {name,isLoggedIn}=action.payload
       console.log(action.payload)
      return {...state,name:name,isLoggedIn:isLoggedIn}
    }
  },
});
export const { testUserAuth } = LoginReducer.actions;
export default LoginReducer.reducer;
