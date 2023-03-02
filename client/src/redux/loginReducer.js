import { createSlice } from "@reduxjs/toolkit";

const LoginReducer = createSlice({
  name: "LoginReducer",
  initialState: {
      name:null,
      token:null,
  },
  reducers: {
    testUserAuth: (state, action) => {
      console.log(action.payload)
      const {name,token}=action.payload
      localStorage.setItem('token',token)
      localStorage.setItem('user',name)
      return {...state,name:localStorage.getItem('user'),token:localStorage.getItem('token')}
    }
  },
});
export const { testUserAuth } = LoginReducer.actions;
export default LoginReducer.reducer;
