import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { testUserAuth } from "../redux/loginReducer";

function UserNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(localStorage.key(0))
    if (
      localStorage.length <= 2 &&
      !localStorage.key(1) &&
      !localStorage.key(2)
    ) {
      navigate("/login");
    } else {
      dispatch(
        testUserAuth({
          name: localStorage.getItem("user"),
          token: localStorage.getItem("token"),
        })
      );
    }
  }, []);

  return (
    <>
      <nav>Nav</nav>
      <Outlet />
    </>
  );
}

export default UserNav;
