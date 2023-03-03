import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Xmark } from '../../assets/Icon'
import { AddQuantity, DeleteProductFromShop, ShowShop, SubtractQuantity } from '../../redux/productsReducer'
import '../../style/shop.scss'


function Shop() {
    const state=useSelector(state=>state.products)
    const dispatch=useDispatch()
    const Close=()=>{
        dispatch(ShowShop(false))  
    }

    
  useEffect(() => {
    document.body.style.overflowY = state.showShop ? 'hidden' : 'auto';
    
  }, [state.showShop]);

    const Delete=(name)=>{
        dispatch(DeleteProductFromShop(name))
    }


    const DisplayShopedProduct = () => {
        return state?.shop?.map((e, index) => {
            for (let i = 0; i < state.products.length; i++) {
                if (state.products[i].name == e.name) {
                   return (
                    <div key={index} className='shop_card'>
                    <img className='shop_card_img' src={"http://localhost:9000/"+state.products[i].img} alt="t-shirt" />
                    <div>
                        <h1>{state.products[i].name}</h1>
                        <button className='delete-btn' onClick={()=>Delete(state.products[i].name)}>Delete</button>
                    </div>
                    <div className='quantity'>
                        <span className='add-btn' onClick={()=>dispatch(AddQuantity(e.name))}>+</span>
                        <h2 className='quantity_number'>{e.quantity}</h2>
                        <button className='sub-btn' disabled={e.quantity <= 1} onClick={()=>dispatch(SubtractQuantity(e.name))}>-</button>
                    </div>
                    </div>
                   )
                }
                
            }
            return null;
        });
      };

      console.log(DisplayShopedProduct().length)

  return (
    <div  className={state.showShop ? 'shop_container' : 'close_shop_container'}>
        <div className='blurContainer'></div>
       <div className='shop_cards_container'>
        <div  className='card_top'>
                  <h3>Your Card</h3>
                  <span className='close_search' onClick={Close}>{Xmark}</span>
        </div>
          {/* DisplayShopedProduct().length i'm doing this test bcz the function return array  */}
          {DisplayShopedProduct().length === 0 ? <p className='no_products'>No Products</p> : DisplayShopedProduct()}
        </div>
    </div>
  )
}

export default Shop