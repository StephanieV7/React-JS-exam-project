import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import AuthContext from './contexts/AuthContext';
import * as authService from './services/authService'


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

function App() {
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();

  const loginSubmitHandler = async (values) => {
    const result = await authService.login(values.email, values.password);
    console.log(result);
    setAuth(result);
    localStorage.setItem('accessToken', result.accessToken);
    navigate('/trips');
  }

  const registerSubmitHandler = async (values) => {
    const result = await authService.register(values.email, values.password);
    setAuth(result);
    localStorage.setItem('accessToken', result.accessToken)
    navigate('/')
  }

  const logoutHandler = () => {
    setAuth({});
    localStorage.removeItem('accessToken')
  }

  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    logoutHandler,
    username: auth.username || auth.email,
    email: auth.email,
    isAuthenticated: !!auth.email,
    _id: auth._id
  }


  return (
    <AuthContext.Provider value={values}>
      <div>

        <NavBar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/trips' element={<AllTrips />} />
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


    </AuthContext.Provider>
  )
}

export default App
