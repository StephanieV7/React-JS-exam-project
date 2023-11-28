import { Routes, Route} from 'react-router-dom';

import {AuthProvider} from './contexts/AuthContext';

import NavBar from './components/navBar/NavBar';
import AllTrips from "./components/tripsList/TripsList";
import About from './components/about/About';
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import TripDetails from './components/tripDetails/TripDetails';
import AddTripModal from './components/tripsList/AddTripModal';
import Login from './components/login/Login'
import Register from './components/register/Register'
import Logout from './components/logout/Logout'
import Blog from './components/blog/Blog';
import SharedTrips from './components/sharedTrips/SharedTrips';

function App() {
  

  return (
    <AuthProvider>
      <div>

        <NavBar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/trips' element={<AllTrips />} />
          <Route path='/sharedTrips' element={<SharedTrips/>} />
          <Route path='/addTrip' element={<AddTripModal />} />
          <Route path="/trips/:_id" element={<TripDetails />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/blog' element={<Blog />} />
        </Routes>

        <Footer />
      </div>


    </AuthProvider>
  )
}

export default App
