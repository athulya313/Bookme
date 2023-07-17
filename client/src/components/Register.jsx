import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {

      

    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('') 
                                                                                           
     const registerHandler=(e)=>{
        e.preventDefault()
      try{
        axios.post('http://localhost:4000/register',{
          name,
          email,
          password
        })
        alert("Registration successfull.now you can login");
      }catch(error){
        alert("Registration failed.please try again later");
      }
        
      }
  return (
    <div className='mt-8 items-center justify-around'>
    <h1 className='text-center text-4xl mb-4'>Register</h1>
    <form onSubmit={registerHandler} className='max-w-md mx-auto '>
        <input type='text' placeholder='Enter your Name' value={name} onChange={e=> setName(e.target.value)}/>
        <input type='email' placeholder='abcd@gmail.com' value={email} onChange={e=> setEmail(e.target.value)}/>
        <input type='password' placeholder='password' value={password} onChange={e=> setPassword(e.target.value)}/>
        <button className='primary'>Register</button>
     <div className='text-center py-2 text-gray-500 '>
        Already have an account? <Link className='underline text-black' to={'/login'}>Login</Link></div>            
    </form>
</div>
  )
}

export default Register