import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import axiosInstance  from "../../api/axios";


function Login() {
   // const [clicked, handleClick] = useAuth();
    const Login_Url='/user/login'
    const navigate=useNavigate()
    const EmailRef=useRef()
    const dispatch=useDispatch()
    const [values,setValues]=useState({
          email:'',
          password:''
    })
    const [err,setErr]=useState({
          emailErr:null,
          passwordErr:null,
          responseErr:null

    })

    useEffect(()=>{
          EmailRef.current.focus()
    },[])

    useEffect(()=>{
        setErr({...err,passwordErr:null,emailErr:null})
    },[values])
     
    const InputHandler=(e)=>{
          const {name,value}=e.target
          setValues({...values,[name]:value})
          console.log(values)
    }

   
    const BtnHandler= async ()=>{
        const {email,password}=values
          if (email.trim() == '' && password.trim() == '') {
              setErr({...err,passwordErr:'Password Required',emailErr:'Email Required'})
          }
          else if(email.trim() == "" && password.trim() != ""){
            setErr({...err,passwordErr:null,emailErr:'Email Required'})
          }
          else if(email.trim() != "" && password.trim() == ""){
            setErr({...err,passwordErr:'Password Required',emailErr:null})
          }
          else {
             try {
                await axiosInstance.post(Login_Url,values)
                .then((res)=> {
                  if (res.data?.name) {
                    return navigate('/')
                      
                  }
                })
                
             } catch (error) {
              console.log(error)
                 if (!error?.response) {
                    setErr({...err,responseErr:'No Server Response'}) 
                 }
                 else if(error.response?.status === 404 ){
                    setErr({...err,responseErr:'Not Found'})    // if the user not exist 
                 }
                 else if(err.response?.status === 401){   // 401 Unauthorized
                  setErr({...err,responseErr:'Email/PassWord Wrong'})   
                 } 
             }
          }
         
    }

    console.log(err)

  return (
    <div>
      <input
        type={"email"}
        name="email"
        placeholder="Email"
        autoComplete="off"
        ref={EmailRef}
        onChange={InputHandler}
        />
        {err.emailErr && err.emailErr}
      <input
        type={"password"}
        name="password"
        placeholder="Password"
        autoComplete="off"
        
        onChange={InputHandler}
      />
       
      <input type={"submit"} value="LogIn"  onClick={BtnHandler} />
    </div>
  );
}

export default Login;