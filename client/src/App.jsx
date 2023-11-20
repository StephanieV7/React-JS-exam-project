import { Routes, Route } from 'react-router-dom'

import Preloader from "./components/preloader/Preloader";
import NavBar from "./components/navBar/NavBar";
import Header from "./components/header/Header";
import AllTrips from "./components/tripsList/TripsList";
import About from './components/about/About';
import Intro from "./components/home/Intro";
import Footer from "./components/footer/Footer";
import Contact from "./components/contact/Contact";
import Services from "./components/home/Services";
import Description from "./components/home/Description";
import TripDetails from './components/tripDetails/TripDetails';
import AddTripModal from './components/tripsList/AddTripModal';

function App() {

  return (
    <>
      <div>
        <>

          <Preloader />
          <NavBar />
          <Header />

          <Routes>
            <Route path='/' element={[<Intro />, <Description/>, <Services />]} />
            <Route path='/trips' element={<AllTrips />} />
            <Route path='/addTrip' element={<AddTripModal />} />
            <Route path="/trips/:_id" element={<TripDetails/>}/>
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
          
         
        </>

      </div>
      <Footer />
    </>
  )
}

export default App
