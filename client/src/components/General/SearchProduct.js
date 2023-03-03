import React, { useState } from 'react'
import {  Xmark2 } from '../../assets/Icon'
import useSearch from '../../hooks/Search'
import '../../style/search.scss'

function SearchProduct({search,setSearch}) {
        const [keyword, setKeyword] = useState('');
        const searched = useSearch(keyword);
    
    const CloseSearch=()=>{
        setSearch(false)
       
    }
  
    const SearchHandler = (e) => {
      setKeyword(e.target.value);
    };
  
  
  return (
     <>
         <div className={search ? 'search_blur_true' : 'search_blur_false'} ></div>
         <div className={search ? 'search_container_true' : 'search_container_false'}>
            <div  className='search_top'>
                  <h3>Search</h3>
                  <span className='close_search' onClick={CloseSearch}>{Xmark2}</span>
            </div>
            <input type={'text'} className='search_input' placeholder='Enter a keyword...' onChange={SearchHandler} />
             {keyword !=''  &&  searched?.map((state,i)=> (
                   <div key={i} className='shop_card'>
                    <div className='overlay' ></div>
                   <img className='shop_card_img' src={"http://localhost:9000/"+state.img} alt="t-shirt" />
                   <div>
                       <span className='product_type'>Shoes</span>
                       <h1>{state.name}</h1>
                       <p className='price'>${state.price}</p>
                   </div>
                   </div>
             ))}
        </div>
     </>
  )
}

export default SearchProduct