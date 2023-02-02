import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { testUserAuth } from "../redux/loginReducer";

export const useAuth = () => {
  const dispatch=useDispatch()
  const [getUser, setUser] = useState({
    isLoggedIn: false,
    err: null,
  });

  useEffect(() => {
    const Fetch = async () => {
      try {
        await axios
          .get("/user/login")
          .then((res) => {
             
               if (res.response?.data?.message == 'Not LoggedIn') {
                     setUser({...getUser,isLoggedIn:false})
                } else {
                     setUser({...getUser,isLoggedIn:true})
                     console.log(res?.data)
                     dispatch(testUserAuth({name:res?.data?.name,isLoggedIn:true}))
               }
          });
      } catch (error) {
        console.log(error)
      }
    };

    Fetch()
  }, []);

  return getUser;
};


