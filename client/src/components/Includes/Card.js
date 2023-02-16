import React from 'react'
import "../../style/card.scss"
import ProductImg from '../../assets/Nike.png'

function Card() {
  return (
   <div class="card_container">
  <div class="card">
    <div class="imgBx">
      <img src={'http://localhost:9000/images/Nike.png'} />
    </div>
    <div class="contentBx">
        <br />
        <br />
        <br />
        <br />
        <br />
      <h2>Nike Shoes</h2>
      <a href="#">Buy Now</a>
    </div>
  </div>
</div>
  )
}

export default Card