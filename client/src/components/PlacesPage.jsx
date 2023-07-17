
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Account from './Account';
import axios from 'axios';

function PlacesPage() {
  const[places,setPlaces]=useState([])
  useEffect(()=>{
    axios.get("http://127.0.0.1:4000/places",{withCredentials:true}).then(({data})=>{
     setPlaces(data)
     
    })
  
  },[])
  
  
 
  return (
    <div>
      <Account/>
      <div className='text-center'>
      
        <Link className='gap-1 mt-8 bg-primary text-white py-2 px-6 rounded-full inline-flex' to={"/profile/accomodation/add"} >Add New Places
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
</Link>
 </div>
 <div className='mt-4'>
 {places.length > 0 && places.map(place=>(
  <Link key={place._id} to={'/profile/accomodation/'+place._id}>
  <div className='bg-gray-100 gap-4 p-4 rounded-2xl flex cursor-pointer'>
   <div className='flex w-32 h-32 bg-gray-200'>
    {place.photos.length > 0 && (
    <img className="object-cover" src={"http://localhost:4000/uploads/"+place.photos[0]} alt=''/>
    
    
)}
   </div>
   <div className='grow-0 shrink'>
    <h2 className='text-2xl'> {place.title}</h2>
    <p className='text-sm mt-2'>{place.description}</p>
</div>
  </div>
  </Link>
 ))}
 </div>
      
 </div>
  )
}

export default PlacesPage