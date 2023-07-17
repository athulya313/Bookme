import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Bookingdetails from './Bookingdetails';

function Placepage() {
    const {id}=useParams();
    const[place,setPlace]=useState(null);
    const[showAllPhotos,setShowAllPhotos]=useState(false)

    useEffect(()=>{
      if(!id){
        return;
    }
    axios.get("http://localhost:4000/places/"+id).then(response =>{
        setPlace(response.data)
    })
  },[id] )
    
    
    if(!place) return ''

    if(showAllPhotos){
      return(
        <div className='absolute inset-0 bg-white min-h-screen' >
          <div className='p-8 grid gap-4'>
            <div>
              <h2 className='text-3xl '> Photos of {place.title}</h2>
            <button onClick={()=>setShowAllPhotos(false)} className='flex gap-1 py-2 px-4 rounded-2xl fixed right-12 top-9 shadow shadow-black'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

              close photos</button>
              </div>
            
          {place?.photos?.length > 0 && place.photos.map(photo=>(
            <div>
            <img className='min-w-full' src={'http://127.0.0.1:4000/uploads/'+photo}></img>
            </div>

          ))}
          </div>
        </div>
      )
    }

  
    return (
    <div className='mt-4 bg-gray-100 px-8 pt-8 -mx-8'>
       <h1 className='text-3xl mr-36'>{place.title}</h1>
       <a className='my-2 block font-semibold underline' href={'https://maps.google.com/?q='+place.address} target='_blank'>{place.address}</a>
       <div className='relative'>      
      <div className='grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden'>
      <div>
        {place.photos?.[0] &&(
          <div>
            <img className='aspect-square object-cover' src={'http://localhost:4000/uploads'+place.photos?.[0]}/>
            </div>
        )}
        </div>
        <div className='grid'>
        {place.photos?.[1] &&(
            <img className='aspect-square object-cover' src={'http://localhost:4000/uploads'+place.photos?.[1]}/>
        )} 
        <div>
        {place.photos?.[2] &&(
            <img className='aspect-square object-cover relative top-2' src={'http://localhost:4000/uploads'+place.photos?.[2]}/>
        )}
        </div>
        </div>
        </div>
        <button onClick={()=>setShowAllPhotos(true)} className='flex gap-2 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>

          Show more photos
          </button>
      </div>
     
      <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-8 mb-8 gap-8'>
        <div>
        <div className='my-4'>
        <h2 className='font-semibold text-2xl'>Description</h2>
        {place.description}
      </div>
        Check-in: {place.checkIn}<br/>
        Check-Out: {place.checkOut}<br/>
        Max no of guests:{place.maxGuests}
        </div>
        <div>
        <Bookingdetails place={place}/>
        </div>
      </div>
      <div className='bg-white -mx-8 px-8 py-8'>
        <div>
         <h2 className='font-semibold text-2xl'> Extra Info</h2>
        </div>
        <div className='mb-4 mt-2 text-sm text-gray-700 leading-5'>{place.extraInfo}</div>
      </div>
    </div>
  )
}

export default Placepage