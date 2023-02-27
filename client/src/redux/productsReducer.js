import { createSlice } from "@reduxjs/toolkit";


const ProductReducer=createSlice({
       name:'ProductReducer',
       initialState:{shop:[],products:[],showShop:false},
       reducers:{
          getProducts:(state,{payload})=>{
                return {...state,products:payload}
          },
          shopProducts:(state,{payload})=>{
            const shopProducts=localStorage.setItem('shop',JSON.stringify(state.shop.concat(payload)))
            if (Array.isArray(payload)) {
                  return {...state,shop:state.shop.concat(...payload)}
            }
            else{
                  return {...state,shop: state.shop.concat(payload)}
            }
          },
          ShowShop:(state,{payload})=>{
                  return {...state,showShop:payload}   
          },
          DeleteProductFromShop:(state,{payload})=>{
            const shopProducts=localStorage.setItem('shop',JSON.stringify(state.shop.filter((e)=> e != payload)))
            return {...state,shop:state.shop.filter((e)=> e != payload)}   
    }
    }
})



export const {getProducts,shopProducts,ShowShop,DeleteProductFromShop} = ProductReducer.actions
export default ProductReducer.reducer
