import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


const useSearch=(keyword)=>{
      const [searched,setSearched]=useState([])
      const state=useSelector(state=>state.products.products)

 
      useEffect(() => {
        setSearched(state.filter((val) => val.name.toLowerCase().includes(keyword.toLowerCase())));
      }, [state, keyword]);

     return searched

}


export default useSearch