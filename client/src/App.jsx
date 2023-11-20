import { Routes, Route } from 'react-router-dom'

import Preloader from "./components/preloader/Preloader";
import NavBar from "./components/navBar/NavBar";
import Header from "./components/header/Header";
import AllTrips from "./components/myTrips/AllTrips";
import About from './components/about/About';
import Intro from "./components/home/Intro";
import Footer from "./components/footer/Footer";
import Contact from "./components/contact/Contact";
import Services from "./components/home/Services";
import Description from "./components/home/Description";

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
