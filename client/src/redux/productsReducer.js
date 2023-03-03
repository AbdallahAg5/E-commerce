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
                 //console.log(JSON.stringify(localStorage.getItem('shop').includes(payload)) )
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

          AddQuantity:(state,{payload})=>{
            localStorage.setItem('shop',JSON.stringify(state.shop.map((e) => e.name === payload ? { ...e, quantity: e.quantity + 1 } : e)))
             return  {...state, shop: state.shop.map((e) => e.name === payload ? { ...e, quantity: e.quantity + 1 } : e)}
        
          },

          SubtractQuantity:(state,{payload})=>{
            localStorage.setItem('shop',JSON.stringify(state.shop.map((e) => e.name === payload ? { ...e, quantity: e.quantity - 1 } : e)))
            return  {...state, shop: state.shop.map((e) => e.name === payload ? { ...e, quantity: e.quantity - 1 } : e)}
          },

          DeleteProductFromShop:(state,{payload})=>{
            console.log(payload)
            const shopProducts=localStorage.setItem('shop',JSON.stringify(state.shop.filter((e)=> e.name != payload)))
            return {...state,shop:state.shop.filter((e)=> e.name != payload)}   
          }
    }
})



export const {getProducts,shopProducts,ShowShop,DeleteProductFromShop,AddQuantity,SubtractQuantity} = ProductReducer.actions
export default ProductReducer.reducer
