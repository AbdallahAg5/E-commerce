import { createSlice } from "@reduxjs/toolkit";


const ProductReducer=createSlice({
       name:'ProductReducer',
       initialState:{shop:[],products:[],showShop:false},
       reducers:{
          getProducts:(state,{payload})=>{
                return {...state,products:payload}
          },
          shopProducts:(state,{payload})=>{
                 const {shop}=state
                 
                // testing if shoped product are comming from the localstorage to destruct the payload 
                if (Array.isArray(payload) ) {
                console.log(JSON.stringify(localStorage.getItem('shop').includes(payload)) )
                       return {...state, shop: [...new Set([...state.shop, ...payload])]};
                  }
                  else{
                       
                  localStorage.setItem('shop',JSON.stringify(state.shop.concat(payload)))
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
