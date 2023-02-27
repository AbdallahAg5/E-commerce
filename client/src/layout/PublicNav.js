import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Shop } from "../assets/Icon";
import { testUserAuth } from "../redux/loginReducer";
import { ShowShop } from "../redux/productsReducer";
import '../style/publiclayout.scss'

function PublicNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state=useSelector(state=>state.products.shop)
  const location = useLocation();

  useEffect(() => {
    if (
      localStorage.length == 2 &&
      localStorage.key(0) &&
      localStorage.key(1)
    ) {
      dispatch(
        testUserAuth({
          name: localStorage.getItem("user"),
          token: localStorage.getItem("token"),
        })
      );
      navigate("/home");
    } 
  }, []);


  const HandleShop=()=>{
      
      dispatch(ShowShop(true))
  }

  return (
    <div className=''>
             <nav className='public_layout'>
                <h1 className='logo'>Logo Shit</h1>
                <ul className='ul-public'>
                    <Link  to={'/'} ><li>Home</li></Link>
                    <Link  to={'/register'} ><li>Register</li></Link>
                    <Link  to={location.pathname} onClick={HandleShop} ><li>{Shop}<span className="shop_number">{state.length}</span></li></Link>
                </ul>
             </nav>
             <Outlet />
         </div>
  );
}

export default PublicNav;
