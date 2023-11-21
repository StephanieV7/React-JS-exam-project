import { Routes, Route, useNavigate } from 'react-router-dom'


import NavBar from './components/navBar/NavBar';

import AllTrips from "./components/tripsList/TripsList";
import About from './components/about/About';

import Footer from "./components/footer/Footer";

import Home from "./components/home/Home";
import TripDetails from './components/tripDetails/TripDetails';
import AddTripModal from './components/tripsList/AddTripModal';
import Login from './components/login/Login'
import Register from './components/register/Register'

function App() {

   return (

   <>
   
       <div>
        
          <NavBar />
       

          <Routes>
            <Route path='/' element={ <Home />} />
            <Route path='/trips' element={<AllTrips />} />
            <Route path='/addTrip' element={<AddTripModal />} />
            <Route path="/trips/:_id" element={<TripDetails />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
         
          </Routes>


       

      </div>
      <Footer />
   </>
  

  


  )
}

export default App
