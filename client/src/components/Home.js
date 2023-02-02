import React, { useRef } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Home() {
    
    const InputRef=useRef(null)
    const navigate=useNavigate()
    const BtnHandler=()=>{
         if(InputRef.current.value){
             navigate('/quiz')
         }
         else{

         }
    }

  return (
    <div>
      <input type={'email'} placeholder={"Email*"} ref={InputRef} />
      <input type={'submit'} value='Start Quiz' onClick={BtnHandler} />
    </div>
  )
}

export default Home