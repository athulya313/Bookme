import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PlaceImg from './PlaceImg'

function Booking() {
    const {id}=useParams()
    const[booking,setBooking]=useState(null)
   

    useEffect(()=>{
      if(id){
        axios.get("http://127.0.0.1:4000/bookings",{withCredentials:true}).then(({data})=>{
          const Booking=data.find(({_id})=> _id === id)
          setBooking(Booking)
        
        }) 
      }
      
  },[]) 


    
    if(!booking){
      return ''
    } 


  return (
    <div className='my-8'>
      <h1 className='text-3xl'>{booking.place.title}</h1>
      <div className='w-100 py-4'>
                    <PlaceImg place={booking.place}/>  
                </div>
      </div>

  )
}

export default Booking