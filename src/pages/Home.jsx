import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import FreeTraining from '../components/FreeTraining';


function Home() {
  return (
    <>
    <div>
        <Navbar/>
        <Hero/>
        <FreeTraining/>
        <Footer/>
    </div>
    </>
  )
}

export default Home
