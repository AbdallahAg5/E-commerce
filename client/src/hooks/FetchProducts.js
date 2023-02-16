import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { testUserAuth } from "../redux/loginReducer";

export const useProducts = () => {
  const dispatch=useDispatch()
  const [products,setProducts] = useState([]);

  useEffect(() => {
    const Fetch = async () => {
      try {
        await axios
          .get("/user/products")
          .then((res) => {
                console.log(res)
          });
      } catch (error) {
        console.log(error)
      }
    };

    Fetch()
  }, []);

  return products;
};

