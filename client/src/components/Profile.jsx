import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import {  Navigate, useParams } from 'react-router-dom'
import axios from 'axios';
import PlacesPage from './PlacesPage';
import Account from './Account';

function Profile() {
  const[redirect,setRedirect]=useState(false)
  const {ready,user,setUser}=useContext(UserContext)
  
  let {subpage}=useParams();
  if(subpage=== undefined){
    subpage ="profile"
  }
  
  async function Logout() {
    const {token}=  await axios.post("http://127.0.0.1:4000/logout",{ } , { withCredentials: true })
    
    setRedirect("/")
    setUser(null)

   
      
  }

  
  if(!ready){
    return "Loading...."
  }

      if(ready && !user && !redirect){
        return <Navigate to={"/login"}/>
       }

 

 

if(redirect){
 return <Navigate to={redirect}/>
}
 
  return (
  <div>
    <Account/>
    {subpage ==="profile" &&(
      <div className='text-center max-w-lg mx-auto mt-4'>
          Logged in as {user.name} ({user.email}) <br/>
          <button onClick={Logout} className='primary max-w-sm mt-2'>Logout</button>
        </div>
    )}
   
    {subpage==="accomodation" && (
      <PlacesPage/>
    )}

  </div>
  )
}

export default Profile