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
                <table>
                  <thead>
                    <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>Home</td>
                        <td>Terms & Conditions</td>
                        <td>Let's Chat</td>
                     </tr>
                     <tr>
                        <td>About</td>
                        <td>Privacy & Policy</td>
                        <td>contact@app.com</td>
                     </tr>
                     <tr>
                        <td>Contact</td>
                        <td>Cookie Policy</td>
                        <td>{}</td>
                     </tr>
                  </tbody>
                </table>
             </nav>
         </div>
  );
}

export default Footer;
