import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { PassengerInfoProvider } from './contexts/PassengerInfoContext';

import NavBar from './components/navBar/NavBar';
import TripsList from './components/tripsList/TripsList';
import About from './components/about/About';
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import TripDetails from './components/tripDetails/TripDetails';
import AddTrip from './components/tripCreate/AddTrip';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Logout from './components/logout/Logout';
import SharedTrips from './components/sharedTrips/SharedTrips';
import AuthGuard from './components/guards/AuthGuard';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import UpdateTrip from './components/tripUpdate/TripUpdate';
import Blog from './components/news/Blog';
import AddArticle from './components/news/AddArticle';
import { LoadScript } from '@react-google-maps/api';



function App() {


  return (
    <ErrorBoundary>

      <AuthProvider>
        <PassengerInfoProvider>
          <div>
            <NavBar />

            <Routes>
              <Route path='/' element={<Home />} />

              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/blog' element={<Blog />} />
              <Route path='/addArticle' element={<AddArticle />} />

              <Route element={<AuthGuard />}>
                <Route path='/trips' element={<TripsList />} />
                <Route path='/sharedTrips' element={<SharedTrips />} />
                <Route path='/addTrip' element={<AddTrip />} />
                <Route path='/updateTrip/:_id' element={<UpdateTrip />} />


                <Route path="/trips/:_id" element={<TripDetails />} />


                <Route path='/logout' element={<Logout />} />

              </Route>

            </Routes>

            <Footer />

          </div>

        </PassengerInfoProvider>
      </AuthProvider>
    </ErrorBoundary >

  )
}

export default App
