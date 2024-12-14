import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Training from '../components/Training'

function Trainings() {
  return (
    <>
    <div>
    <Navbar/>
    <div className=' min-h-screen'>
      <Training/>
    </div>
      <Footer/>
    </div>
    </>
  )
}

export default Trainings

