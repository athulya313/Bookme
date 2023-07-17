import axios from 'axios'

import React, { useContext, useState } from 'react'
import { Link, Navigate} from 'react-router-dom'
import { UserContext } from '../UserContext'

function Login() {
  const [email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[redirect,setRedirect]=useState('')

  const {setUser}=useContext(UserContext);
 
  
   
 const loginHandler= async (e)=>{
  e.preventDefault()
    try{
   const {data}=await axios.post('http://127.0.0.1:4000/login',{email,password},{withCredentials:true})
 
   
   
   setUser(data)
   alert("login successfull")
   setRedirect(true)
   
  
  }catch(error){
      alert("login failed")
    }
  }

  if(redirect){
return <Navigate to={"/"}/>
  }

  return (
    <div className='mt-8 items-center justify-around'>
        <h1 className='text-center text-4xl mb-4'>Login</h1>
        <form onSubmit={loginHandler} className='max-w-md mx-auto '>
            <input type='email' placeholder='abcd@gmail.com' value={email} onChange={e=>setEmail(e.target.value)}/>
            <input type='password' placeholder='password' value={password} onChange={e=>setPassword(e.target.value)}/>
            <button className='primary'>Login</button>
         <div className='text-center py-2 text-gray-500 '>
            Dont have an account? <Link className='underline text-black' to={'/register'}>Register now</Link></div>            
        </form>
    </div>
  )
}

export default Login