import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { testUserAuth } from "../redux/loginReducer";
import '../style/publiclayout.scss'

function PublicNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <div className=''>
             <nav className='public_layout'>
                <h1 className='logo'>Logo Shit</h1>
                <ul className='ul-public'>
                    <Link  to={''} ><li>Home</li></Link>
                    <Link  to={'/register'} ><li>Register</li></Link>
                    <Link  to={''} ><li>Policy</li></Link>
                </ul>
             </nav>
             <Outlet />
         </div>
  );
}

export default PublicNav;
