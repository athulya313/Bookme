import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



function Index() {
  const[places,setPlaces]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:4000/allplaces").then(response=>{
       setPlaces(response.data)
    })
  },[])
  return (
    <div className='mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4 px-8 gap-y-8 gap-x-6'>
      {places.length >0 && places.map(place=>(
        <Link to={"/place/"+place._id}>  
          <div className='bg-gray-500 rounded-2xl flex mb-2'>
          {place.photos?.[0] &&(
            <img className='object-cover aspect-square rounded-2xl' src={'http://localhost:4000/uploads'+place.photos[0]} />
          )}
            </div>
            <h3 className='font-bold'>{place.address}</h3>
          <h2 className='text-sm  text-gray-500'>{place.title}</h2>
          
          <div>
          ₹ {place.price} per night
            </div>
          </Link>
      ))}
    </div>
  )
}

export default Index
