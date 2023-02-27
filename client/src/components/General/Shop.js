import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Xmark } from '../../assets/Icon'
import { DeleteProductFromShop, ShowShop } from '../../redux/productsReducer'
import '../../style/shop.scss'


function Shop() {
    const state=useSelector(state=>state.products)
    const dispatch=useDispatch()
    const Close=()=>{
        dispatch(ShowShop(false))  
    }


    const Delete=(name)=>{
        dispatch(DeleteProductFromShop(name))
    }

    const DisplayShopedProduct = () => {
        return state?.shop?.map((e, index) => {
            for (let i = 0; i < state.products.length; i++) {
                if (state.products[i].name == e) {
                   return (
                    <div className='shop_card'>
                    <img className='shop_card_img' src={"http://localhost:9000/"+state.products[i].img} alt="t-shirt" />
                    <div>
                        <h1>{state.products[i].name}</h1>
                        <button onClick={()=>Delete(state.products[i].name)}>Delete</button>
                    </div>
                    </div>
                   )
                }
                
            }
            return null;
        });
      };


  return (
    <div  className={state.showShop ? 'shop_container' : 'close_shop_container'}>
        <div className='blurContainer'></div>
       <div className='shop_cards_container'>
        <span className='close_shop' onClick={Close}>{Xmark}</span>
          <div>
          {DisplayShopedProduct()}
          </div>
        </div>
    </div>
  )
}

export default Shop