import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Products from "../components/products";
import axios from "axios";
import { urls } from "../constants";

function Training({ addItemToCart }) {
  const [training, setTraining] = useState([]); // To store training data

  // Fetch training data from the backend
  useEffect(() => {
    const getTraining = async () => {
      try {
        const res = await axios.get(
          `${urls.url}/training` //https://greenfit-fitness-backend.onrender.com
        );
        console.log(res.data);
        setTraining(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTraining();
  }, []);

  // Filter trainings by categories
  const freeTraining = training.filter((item) => item.category === "Free");
  const paidYoga = training.filter((item) => item.category === "Paid Yoga");
  const paidTraining = training.filter(
    (item) => item.category === "Paid Training"
  );

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl font-semibold md:text-4xl">
            <span className="text-green-600">Welcome to GreenFit</span>, Join
            Our Expert-Guided Fitness and Yoga Trainings Today!
          </h1>
          <p className="mt-12">
            Our courses range from high-energy cardio sessions to calming yoga
            flows, designed to improve strength, flexibility, and endurance,
            with expert guidance and personalized routines for faster and more
            effective results. Achieve your fitness goals and overall
            well-being.
          </p>
          <Link to="/signup">
            <button className="bg-green-600 mt-7 text-white py-2 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600">
              Join
            </button>
          </Link>
        </div>

        {/* Paid Yoga Section */}
        {paidYoga.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-green-600">
              Yoga For You
            </h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {paidYoga.map((item) => (
                <div key={item._id}>
                  <Link to={`/training/${item._id}`}>
                    <Products item={item} addItemToCart={addItemToCart} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Paid Training Section */}
        {paidTraining.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-green-600">
              Gym Training
            </h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {paidTraining.map((item) => (
                <div key={item._id}>
                  <Link to={`/training/${item._id}`}>
                    <Products item={item} addItemToCart={addItemToCart} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Free Training Section */}
        {freeTraining.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-green-600">
              Free Training
            </h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {freeTraining.map((item) => (
                <div key={item._id}>
                  <Link to={`/training/${item._id}`}>
                    <Products item={item} addItemToCart={addItemToCart} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Training;
