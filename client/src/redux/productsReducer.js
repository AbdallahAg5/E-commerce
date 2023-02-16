import { createSlice } from "@reduxjs/toolkit";


const ProductReducer=createSlice({
       name:'ProductReducer',
       initialState:[],
       reducers:{
          getProducts:(state,{payload})=>{
                return state=payload
          }
       }
})



export const {getProducts} = ProductReducer.actions
export default ProductReducer.reducer
