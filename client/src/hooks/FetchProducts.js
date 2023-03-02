import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import  { axiosClient } from "../api/axios";
import {getProducts, shopProducts} from '../redux/productsReducer'

export const useProducts = () => {
  const dispatch=useDispatch()
  const [products,setProducts]=useState()
  useEffect(() => {
    const Fetch = async () => {
      try {
        await axiosClient
          .get("/user/products")
          .then((res) => {
            dispatch(getProducts(res.data.products))   
            if (localStorage.getItem('shop') && JSON.parse(localStorage.getItem('shop')).length > 0 ) {
              const Shoped=JSON.parse(localStorage.getItem('shop'))
              dispatch(shopProducts(Shoped))
            }  
           
          });
      } catch (error) {
        console.log(error)
      }
    };

    Fetch()
  }, []);

  return products;
};

