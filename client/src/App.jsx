
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Index from './components/Index'
import Login from './components/Login'
import Header from './Header'
import Register from './components/Register'

import { UserContextProvider } from './UserContext'
import Profile from './components/Profile'
import PlacesPage from './components/PlacesPage'
import PlacesFormPage from './components/PlacesFormPage'
import Placepage from './components/Placepage'
import Bookings from './components/Bookings'
import Booking from './components/Booking'


//axios.default.baseURL="http://127.0.0.1:4000"
 

function App() {


  return (
    <div>
    
     <UserContextProvider>
    
      <Header/>
      
     <Routes>
     
      <Route path='/' element={<Index/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/profile/accomodation' element={<PlacesPage/>}/>
      <Route path="/profile/accomodation/add" element={<PlacesFormPage/>}/>
      <Route path='/profile/accomodation/:id' element={<PlacesFormPage/>}/>
      <Route path='/place/:id' element={<Placepage/>}/>
      <Route path='/account/bookings' element={<Bookings />}/>
      <Route path='/account/bookings/:id' element={<Booking/>}/>


     

     </Routes>
     </UserContextProvider>
    



    </div>
  )
}

export default App
