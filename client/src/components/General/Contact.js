import React, { useRef } from 'react'
import MapChart from './Map'
import '../../style/contact.scss'
import emailjs from '@emailjs/browser';

function Contact() {
    const form = useRef();
   const HandleSubmit=(e)=>{
    e.preventDefault()

    emailjs.sendForm(process.env.REACT_APP_YOUR_SERVICE_ID, process.env.REACT_APP_YOUR_TEMPLATE_ID, form.current,process.env.REACT_APP_YOUR_PUBLIC_KEY )
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });

   }
   
  return (
    <div className='contact_container'>
        <form ref={form} onSubmit={HandleSubmit} className='contact_form'>
            <h1 className='contact_title'>Contact </h1>
            <input type={'text'} name='name' placeholder='Name' /><br />
            <input type={'email'} name='email' placeholder='Email' /><br />
            <textarea placeholder='Message' name='message' rows={10} ></textarea>
            <input type={'submit'} className='submit_btn' ></input>

        </form>
        <MapChart />
    </div>
  )
}

export default Contact