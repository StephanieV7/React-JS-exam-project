import { Routes, Route } from 'react-router-dom'

import Preloader from "./components/Preloader";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import AllTrips from "./components/AllTrips";
import About from './components/About';
import Intro from "./components/Intro";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Services from "./components/Services";
import Description from "./components/Description";

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
            <Route path='/trips' element={<AllTrips title="October 2023" destination1="Italy" destination2="Egypt" duration="15" startDate="01.10.2023" endDate="15.10.2023" />} />
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
