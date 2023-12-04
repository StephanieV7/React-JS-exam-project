import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import NavBar from './components/navBar/NavBar';
import AllTrips from "./components/tripsList/TripsList";
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
import News from './components/news/news';


function App() {


  return (
    <ErrorBoundary>

      <AuthProvider>
        <div>

          <NavBar />

          <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/news' element={<News />} />

            <Route element={<AuthGuard />}>
              <Route path='/trips' element={<AllTrips />} />
              <Route path='/sharedTrips' element={<SharedTrips />} />
              <Route path='/addTrip' element={<AddTrip />} />
              <Route path='/updateTrip/:_id' element={<UpdateTrip />} />
              <Route path="/trips/:_id" element={<TripDetails />} />
              <Route path='/logout' element={<Logout />} />

            </Route>

          </Routes>

          <Footer />
        </div>


      </AuthProvider>
    </ErrorBoundary>

  )
}

export default App
