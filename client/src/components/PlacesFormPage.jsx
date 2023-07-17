import React, { useEffect, useState } from 'react'
import PhotosUploader from './PhotosUploader';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';

function PlacesFormPage() {
  const{id}=useParams();
 
    const[title,setTitle]=useState('')
  const[address,setAddress]=useState('')
  const[description,setDescription]=useState('')
  const[perks,setPerks]=useState([])
  const[extraInfo,setExtraInfo]=useState('')
  const[checkIn,setCheckIn]=useState('')
  const[checkOut,setCheckOut]=useState('')
  const[maxGuests,setMaxGuests]=useState(1)
  const[addedPhotos,setAddedPhotos]=useState([]);
  const[redirect,setRedirect]=useState(false)
  const[price,setPrice]=useState(1000)
  useEffect(()=>{
    if (!id){
      return;
    }
    axios.get('http://127.0.0.1:4000/places/'+id).then(response=>{
      const{data}=response;
      setTitle(data.title),setAddress(data.address),
      setDescription(data.description),setAddedPhotos(data.photos),
      setPerks(data.perks),setExtraInfo(data.extraInfo),
      setCheckIn(data.checkIn),setCheckOut(data.checkOut),
      setMaxGuests(data.maxGuests),setPrice(data.price)
    })
  },[id])

  const handleCbClick = (event) => {
    console.log(event);
    const { name, checked } = event.target;
    if (checked) {
      setPerks((perks) => [...perks, name]);
    } else {
      setPerks((perks) => perks.filter((perk) => perk !== name));
    }
  };

  async function savePlace(e){
    e.preventDefault()
    if(id){
      //update place
      await axios.put('http://127.0.0.1:4000/places',{
        id,title,address,addedPhotos,
        description,perks,extraInfo,
        checkIn,checkOut,maxGuests,price},{withCredentials:true})
       setRedirect(true)
    }else{
      //new place
      await axios.post('http://127.0.0.1:4000/places',{
        title,address,addedPhotos,
        description,perks,extraInfo,
        checkIn,checkOut,maxGuests,price},{withCredentials:true})
       setRedirect(true)
     }
    }
  
   if(redirect){
    return <Navigate to={"/profile/accomodation"}/>
   }
  return (
  <div>
  <form onSubmit={savePlace}>
    <h2 className='text-2xl mt-4'>Title</h2>
    <p className='text-gray-500 text-sm'>Title for your place</p>
  <input value={title} onChange={e=> setTitle(e.target.value)} type='text' placeholder='title,for eg:feels like your own home'/>
  <h2 className='text-2xl mt-4'>Address</h2>
  <p className='text-gray-500 text-sm'>Address to your place</p>
  <input type='text' value={address} onChange={e=> setAddress(e.target.value)} placeholder='your address'/>
    <p className='text-gray-500 text-sm'>Title for your place</p>
    <h2 className='text-2xl mt-4'>Photos</h2>
    <p className='text-gray-500 text-sm'>Add Pictures...</p>
    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
   
<h2 className='text-2xl mt-4'>Description</h2>
<p className='text-gray-500 text-sm'>Description for your place</p>
<textarea value={description} onChange={e=>setDescription(e.target.value)}/>

<h2 className='text-2xl mt-4'> Perks</h2>
<p>Select all the features your place have</p>
<div className='grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
<label className='border p-4 flex rounded-2xl gap-2 items-center  cursor-pointer'>
<input checked={perks.includes('wifi')}  name='wifi' onChange={handleCbClick} type='checkbox' />
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
</svg>

  <span>Wifi</span>

</label>
<label className='border p-4 flex rounded-2xl gap-2 items-center  cursor-pointer' >
<input checked={perks.includes('parking')} type='checkbox'  onChange={handleCbClick} name='parking'  />
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
</svg>

  <span>Free Parking</span>

</label>
<label className='border p-4 flex rounded-2xl gap-2 items-center  cursor-pointer'>
<input type='checkbox' onChange={handleCbClick}  name='tv' checked={perks.includes('tv')}/>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
</svg>

  <span>Tv</span>

</label>
<label className='border p-4 flex rounded-2xl gap-2 items-center  cursor-pointer'> 
<input type='checkbox' onChange={handleCbClick} name='ac' checked={perks.includes('ac')} />
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
</svg>

  <span>Ac</span>

</label>
<label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
<input checked={perks.includes('entrance')} type='checkbox' onChange={handleCbClick} name='entrance' />

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
</svg>


  <span>Private Entrance</span>

</label>
<label className='border p-4 flex rounded-2xl gap-2 items-center  cursor-pointer'>
<input checked={perks.includes('pool')} type='checkbox' onChange={handleCbClick} name='pool'   />
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
</svg>

  <span>Pool</span>

</label>

</div>

<h2 className='text-2xl mt-4'>Extra Info </h2>
<p className='text-gray-500 text-sm'>House Rules etc.</p>
<textarea value={extraInfo} onChange={e=>setExtraInfo(e.target.value)}/>
<h2 className='text-2xl mt-4'>Check In&Out times </h2>
<p className='text-gray-500 text-sm'>add check in and out times</p>
<div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
<div>
<h3 className='mt-2 -mb-1'> Check in time</h3>
<input value={checkIn} onChange={e=>setCheckIn(e.target.value)} type='text' placeholder='13:00'/>
</div>
<div>
<h3 className='mt-2 -mb-1'> Check Out time</h3>
<input value={checkOut} onChange={e=>setCheckOut(e.target.value)} type='text' placeholder='16:00'/>
</div>
<div>
<h3 className='mt-2 -mb-1'>Max guests</h3>
<input value={maxGuests} onChange={e=>setMaxGuests(e.target.value)} type='text' placeholder='eg:6'/>
</div>
<div>
<h3 className='mt-2 -mb-1'>Price</h3>
<input value={price} onChange={e=>setPrice(e.target.value)} type='text' />
</div>
</div>

<button className='primary my-4'>Save</button>
</form>
  </div>
  )
}

export default PlacesFormPage