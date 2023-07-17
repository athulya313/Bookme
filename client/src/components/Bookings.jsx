import React, { useEffect, useState } from 'react'
import Account from './Account'
import axios from 'axios'
import PlaceImg from './PlaceImg'
import {differenceInCalendarDays, format} from 'date-fns'
import { Link } from 'react-router-dom'

function Bookings() {
    const[bookings,setBookings]=useState([])
    useEffect(()=>{
        axios.get("http://127.0.0.1:4000/bookings",{withCredentials:true}).then(({data})=>{
          setBookings(data)
        
        }) 
    },[]) 
  return (
    <div>
        <Account/> 
        <div className='m-10'>
        {bookings?.length  >0 && bookings.map(booking =>(
            <Link to={`/account/bookings/${booking._id}`} className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden '>
                <div className='w-48'>
                    <PlaceImg place={booking.place}/>  
                </div>
                <div>
               <h2 className='py-3'>{booking.place.title}</h2>
               <div className='border-t border-gray-300 mt-2 py-2'>
                {format(new Date(booking.checkIn),'yyyy-MM-dd' )} to {format(new Date(booking.checkOut),'yyyy-MM-dd' )}
                 </div>
                <div>
                  Number of Days: {differenceInCalendarDays(new Date(booking.checkOut) ,new Date(booking.checkIn))}
                
                  </div>
                  <div className='py-1'>
                  Total Price: ₹ {booking.price}
                  </div>
               </div>
            </Link>
         ))}

        </div>

                 
    </div>
  )
}

export default Bookings