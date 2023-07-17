import React, { useContext, useState } from 'react'
import {differenceInCalendarDays} from 'date-fns'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { useEffect } from 'react'

function Bookingdetails({place}) {
  const[checkIn,setCheckin]=useState('')
  const[checkOut,setCheckOut]=useState('')
  const[maxGuests,setMaxGuests]=useState(1)
  const[name,setName]=useState('')
  const[phone,setPhone]=useState('')
  const[redirect,setRedirect]=useState('')
  const{user}=useContext(UserContext)   

  useEffect(()=>{
    if(user){
      setName(user.name)
    }
  },[user])
  let numberOfDays=0;
  if(checkIn && checkOut){
    numberOfDays=differenceInCalendarDays(new Date(checkOut),new Date(checkIn))
  }

 async function bookThisPlace(){
  const response= await axios.post('http://127.0.0.1:4000/bookings',{
    checkIn,checkOut,maxGuests,name,phone,place:place._id,
    price:numberOfDays * place.price  
    },{withCredentials:true})
    const bookingId=response.data._id;
    
    setRedirect(`/account/bookings/${bookingId}`)   
    
  }
  if(redirect){
    return <Navigate to={redirect}/>
  }
  return (
    <div className='bg-white shadow p-4 rounded-2xl text-bl'>
    <div className='text-2xl text-center '>
      Price: ₹ {place.price}
    </div>
    <div className=' border mt-4 rounded-2xl'>
      <div className='flex'>
        <div className='py-3 px-4'>
      <label>Check in:</label>
      <input type='date' value={checkIn} onChange={e=>setCheckin(e.target.value)}/>
    </div>
    <div className='py-3 px-4 border-l'>
      <label>Check out:</label>
      <input type='date' value={checkOut} onChange={e=>setCheckOut(e.target.value)}/>
    </div>
    </div>
    <div className='py-3 px-4 border-t'>
      <label>Number of Guests:</label>
      <input type='number' value={maxGuests} onChange={e=>setMaxGuests(e.target.value)}/>
    </div>
     {numberOfDays >0 &&(
       <div className='py-3 px-4 border-t'>
       <label>Your Name:</label>
       <input type='text' value={name} onChange={e=>setName(e.target.value)}/>
       <label>Phone Number:</label>
       <input type='text' value={phone} onChange={e=>setPhone(e.target.value)}/>
     </div>
     )}
    </div>
    <button onClick={bookThisPlace} className='primary mt-4'>
      Book here
        {numberOfDays >0  && (
        <span>
           ₹ {numberOfDays * place.price}</span>
      )}

    </button>
  </div>
  )
}

export default Bookingdetails