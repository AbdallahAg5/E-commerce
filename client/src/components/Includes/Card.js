import React from 'react'
import "../../style/card.scss"
import { shopProducts } from '../../redux/productsReducer'
import { useDispatch, useSelector } from 'react-redux'

function Card({products}) {
  const {name,description,price,img,inStock}=products
  const dispatch=useDispatch()
  const state=useSelector(state=>state.products.shop)
  const AddToCard=(name)=>{
     dispatch(shopProducts(name))
  }

  const SetDisabled=()=>{
    return state.includes(name);
  }
  return (
    <div class="card">
    <figure>
      <img src={"http://localhost:9000/"+img} alt="t-shirt" />
    </figure>
    <section class="details">
      <div class="min-details">
        <h1>{name} <span style={inStock === "In Stock" ? {backgroundColor:'green',width:'45px'} :{backgroundColor:'red',width:'70px'} }>{inStock}</span></h1>
        <h1 class="price">${price}</h1>
      </div>
      <button  disabled={SetDisabled()} class="btn" onClick={()=>AddToCard(name)}>add to cart</button>
    </section>
  </div>
  )
}

export default Card