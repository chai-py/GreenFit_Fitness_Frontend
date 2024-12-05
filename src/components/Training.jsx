import React from 'react'
import Products from '../components/Products';
import list from '../../public/list.json';
import {Link} from 'react-router-dom' ;


function Training() {
  return (
    <>
    <div className=' max-w-screen-2xl container mx-auto md:px-20 px-4'> 
     <div className='mt-28 items-center justify-center text-center' >
     <h1 className="text-2xl font-semibold md:text-4xl">
        <span className="text-green-600">Welcome to GreenFit</span>, Join Our Expert-Guided Fitness and Yoga Trainings Today!
    </h1>
    <p className='mt-12'>
          Our courses range from high-energy cardio sessions to calming yoga flows, designed to improve strength, flexibility, and endurance, with expert guidance and personalized routines for faster and more effective results., helping you achieve your fitness goals and overall well-being. 
    </p>
    <Link to="/">
        <button className="bg-green-600 mt-7 text-white py-2 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600">
             Join
        </button>
    </Link>
        <div className='mt-12 grid grid-cols-1 md:grid-cols-3'>
            {
                list.map((item)=>{
                  return  <Products key={item.id} item={item} />
                })
                 
            }
        </div>  

     </div>
    </div>
    </>
  )
}

export default Training
