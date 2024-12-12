import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import HeroImg from '../../public/gym.jpg'

function Hero() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleJoinClick = () => {
    // Redirect to the signup page and pass the email via state
    navigate('/signup', { state: { email } });
  };
  return (
    <>
    <div className=' max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-20 space-x-6'>
     <div className='order-2 md:order-1 w-full md:w-1/2 mt-12 md:mt-32'>
      <div className='space-y-4'>
        <h1 className="text-4xl font-bold">
             Your Journey, Your Training.{' '}
             <span className="text-green-700">Choose the Workout That Moves You!</span>
        </h1>
        <p className='text-xl'>
        GreenFit offers personalized training programs tailored to your goals. Whether you're a beginner or a pro, this is the perfect platform to unlock your full potential! 
        </p>
        <label className="input input-bordered flex items-center gap-2">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path
            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input
              type="text"
              className="grow"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update the email state
            />
          </label>
        </div>
        <button
          className="btn mt-6 bg-green-500 text-white hover:bg-green-700 transition duration-300"
          onClick={handleJoinClick} // Trigger the navigation on button click
        >
          Join Us
        </button>
      </div>
      <div className='order-1 w-full md:w-1/2 mt-12 md:mt-0'>
        <img src="https://greenfit.s3.us-east-1.amazonaws.com/Hero+Image.jpeg" className='mb-8 md:mb-0' alt="Hero Image" />
        {/* <img src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg" className='mb-8 md:mb-0' alt="Hero Image" /> */}
      </div>
    </div>
    </>
  );
}

export default Hero
