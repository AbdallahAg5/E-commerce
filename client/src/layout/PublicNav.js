import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Search, Shop } from "../assets/Icon";
import SearchProduct from "../components/General/SearchProduct";
import Footer from "../components/Includes/Footer";
import { useProducts } from "../hooks/FetchProducts";
import { testUserAuth } from "../redux/loginReducer";
import { ShowShop } from "../redux/productsReducer";
import '../style/publiclayout.scss'

function PublicNav() {
  useProducts()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const state=useSelector(state=>state.products)
  const [search,setSearch]=useState(false)

  useEffect(() => {
    if (
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


  const SearchHandler=()=>{
         setSearch(!search)
  }

  return (
<>
<SearchProduct search={search} setSearch={setSearch} />
    <div className={search ? 'container_minimazed' : 'container_normal'}>
             <nav className={'public_layout'}>
                <h1 className='logo'>Logo Shit</h1>
                <ul className='ul-public'>
                    <Link  to={'/'} ><li>Home</li></Link>
                    <Link  to={'/register'} ><li>Register</li></Link>
                    <Link  to={'/contact'} ><li>Contact</li></Link>
                    <Link  to={location.pathname} onClick={HandleShop} ><li>{Shop}<span className="shop_number">{state?.shop?.length}</span></li></Link>
                    <button onClick={SearchHandler}>{Search}</button>
                </ul>
             </nav>
             <Outlet />
             <Footer />
     </div>
</>
  );
}

export default PublicNav;
