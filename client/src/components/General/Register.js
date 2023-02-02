import React, { useEffect, useState } from "react";
import axiosInstance from '../../api/axios'
import "../../style/register.css"


function Register() {
   const REGISTER_URL='/user/register' 
   const [err,setErr]=useState({
       globalErr:'',
       fullNameErr:'',
       emailErr:'',
       passErr:'',
       responseErr:''
    }) 
    const [values,setValues]=useState({
        fullName:'',
        email:'',
        password:''   
        
    })
    // destructuring
    const {fullName,email,password}=values
    const {globalErr,fullNameErr,emailErr,passErr,responseErr}=err

   

    const InputHandler=(e)=>{
         const {name,value}=e.target
         setValues({...values,[name]:value})
    }

    const BtnHandler= async ()=>{
        console.log(values)
          if (fullName.trim().length == 0 || email.trim().length == 0 || password.trim().length ==0  ) {
              setErr({...err,globalErr:'All Field Required .'})
          }
          else{
             try {
                setErr({...err,globalErr:''})   
              await axiosInstance.post(REGISTER_URL,values)
                .then((res)=> res.json() )
                .then((res)=>console.log(res))
             } catch (error) {
              
                 if(error.response?.status === 404 ){ // 404 not found 
                    setErr({...err,responseErr:'Not Found'})
                 }
                 else if (error.response?.status == 409){ // 409 conflict err sent by the server 
                    setErr({...err,responseErr:'Email Already Exist'})
                 }
             }
          }
    }


  return (
    <div>
        {globalErr && <p>{globalErr}</p> }
        {responseErr && <p>{responseErr}</p> }
      <input
        type={"text"}
        placeholder="Full Name"
        name="fullName"
        autoComplete="off"
        onChange={InputHandler}
      />
      <input
        type={"text"}
        placeholder="Email"
        name="email"
        autoComplete="off"
        onChange={InputHandler}
      />
      <input
        type={"text"}
        placeholder="Password"
        name="password"
        autoComplete="off"
        onChange={InputHandler}
      />
      <input type={"submit"} value="SignUp" onClick={BtnHandler} />
    </div>
  );
}

export default Register;
