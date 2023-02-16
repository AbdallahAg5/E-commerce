import React from 'react'
import "../../style/home.scss"
import Card from '../Includes/Card'
import axiosInstance  from "../../api/axios";
import { useProducts } from '../../hooks/FetchProducts';

function PublicHome() {
       const products=useProducts()
       console.log(products)
    
     

  return (
    <div className='home_container'>
        <div className='top_div'>
            <img className='home_img' src='https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' />
        </div>
        <div className='card_container'>
           {[1,2,3,4,5,6,7,8,9].map((e)=> <Card  /> )}
        </div>
    </div>
  )
}

export default PublicHome