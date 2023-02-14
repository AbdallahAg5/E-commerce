import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../../api/axios'
import { testUserAuth } from "../../redux/loginReducer";
import "../../style/register.scss"
import DemoCarousel from "./Slider";


function Register() {
   const REGISTER_URL='/user/register' 
   const dispatch=useDispatch()
   const navigate=useNavigate()
   const [err,setErr]=useState({
       globalErr:'',
       fullNameErr:'',
       emailErr:'',
       passErr:'',
       responseErr:''
    }) 
    const [values,setValues]=useState({
        name:'',
        email:'',
        password:'',
        password_confirmation:''
        
    })
    // destructuring
    const {name,email,password,password_confirmation}=values
    const {globalErr,fullNameErr,emailErr,passErr,responseErr}=err

   

    const InputHandler=(e)=>{
         const {name,value}=e.target
         setValues({...values,[name]:value})
    }

    const HandleSubmit= async (e)=>{
        console.log(values)
          if (name.trim().length == 0 || email.trim().length == 0 || password.trim().length ==0 || password_confirmation.trim().length == 0 ) {
              setErr({...err,globalErr:'All Field Required .'})
          }
          else{
             try {
                setErr({...err,globalErr:''})   
              await axiosInstance.post(REGISTER_URL,values)
                .then((res)=> {
                  dispatch(testUserAuth({name:res.data?.name,token:res.data?.token}))
                  return navigate('/home')
                })
             } catch (error) {
                 console.log(error)
                 if(error.response?.status === 404 ){ // 404 not found 
                    setErr({...err,responseErr:'Not Found'})

                 }
                 if(error.response?.status === 401 ){ // 401 Unauthorized
                  setErr({...err,responseErr:'Passwords Don\'t Match'})
                }
                else if (error.response?.status == 409){ // 409 conflict err sent by the server 
                  setErr({...err,responseErr:'Email Already Exist'})
                }
                // deleting the message
                setTimeout(()=> setErr({...err,globalErr:null}),2000)
              }
            }
            e.preventDefault()
          }
          
          setTimeout(()=> globalErr && setErr({...err,globalErr:null}),2000)

  return (
    <div className='SignIn_Container'>
        <p className={globalErr ? 'globalerr' : 'globalerrNone'}>{globalErr}</p>
        <p className={responseErr ? 'globalerr' : 'globalerrNone'}>{responseErr}</p>
    <div className='SignIn_Content'>
        <h1 className='SignIn'>Register Form</h1>
        <div className="top-space" ></div>
        <input type={'text'} className='TextInput' placeholder='Full Name' onChange={InputHandler} name='name' />
        <input type={'text'} className='TextInput' placeholder='Email' onChange={InputHandler} name='email' />
        <input type={'text'} className='TextInput' placeholder='Password' onChange={InputHandler} name='password' />
        <input type={'text'} className='TextInput' placeholder='Confirm Password' onChange={InputHandler}
            name='password_confirmation' />
        <input type={'submit'} className='Submit' onClick={HandleSubmit} value='SignUp' />
        <p className="already">Already have an account ? <Link className="link" to={'/login'}>Login Now</Link></p>
        <br />
        <p className="copyrights">&copy;2022 All rights reserved.</p>
    </div>
    <DemoCarousel/> 
</div>
  );
}

export default Register;
