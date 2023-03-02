import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Shop } from "../../assets/Icon";
import '../../style/footer.scss'

function Footer() {
 

  return (
    <div className=''>
             <nav className='footer'>
                <div>
                <h1 className='logo'>Logo Shit</h1>
                <p className="quote">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam accumsan dolor turpis, ac fermentum est tempus nec.</p>
                </div>
                {/* <ul className='ul-public'>
                    <Link  to={'/'} ><li>Home</li></Link>
                    <Link  to={'/register'} ><li>Register</li></Link>
                </ul> */}
             </nav>
         </div>
  );
}

export default Footer;
