import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import  { axiosClient }  from "../../api/axios";
import { testUserAuth } from "../../redux/loginReducer";
import DemoCarousel from "./Slider";
import "../../style/register.scss"


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

   
    const HandleSubmit= async (e)=>{
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
                await axiosClient.post(Login_Url,values)
                .then((res)=> {
                  console.log(res)
                  if (res.data?.name) {
                    console.log('hi')
                    dispatch(testUserAuth({name:res.data?.name,token:res.data?.token}))
                     navigate('/home')
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
          e.preventDefault()
    }

    console.log(err)

  return (
    <div>
      <div className='SignIn_Container'>
    <div className='SignIn_Content'>
        <h1 className='SignIn'>Login Form</h1>
        <div className="top-space" ></div>
        <input type={'text'} className='TextInput' ref={EmailRef} placeholder='Email' onChange={InputHandler} name='email' />
        <input type={'text'} className='TextInput' placeholder='Password' onChange={InputHandler} name='password' />
        <div className=""></div>
        <input type={'submit'} className='Submit' value='Login' onClick={HandleSubmit} />
        <p className="already">Don't have an account ? <Link className="link" to={'/register'}>Register Now</Link></p>
        <br />
        <p className="copyrights">&copy;2022 All rights reserved.</p>
    </div>
    <DemoCarousel/> 
</div>
</div>
  );
}

export default Login;