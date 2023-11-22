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

  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    username: auth.username || auth.email,
    email: auth.email,
    isAuthenticated: !!auth.email,
  }


  return (
    <AuthContext.Provider value={values}>

      <NavBar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trips' element={<AllTrips />} />
        <Route path='/addTrip' element={<AddTripModal />} />
        <Route path="/trips/:_id" element={<TripDetails />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/blog' element={<Blog />} />
      </Routes>

      <Footer />
      
    </AuthContext.Provider>
  )
}

export default App
