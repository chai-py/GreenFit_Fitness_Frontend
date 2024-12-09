import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Products from './products';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom

function FreeTraining({ addItemToCart }) {
  const [training, setTraining] = useState([]);

  useEffect(() => {
    const getTraining = async () => {
      try {
        const res = await axios.get("http://localhost:4000/training");
        console.log(res.data);
        setTraining(res.data.filter((data) => data.category === "Free"));
      } catch (error) {
        console.log(error);
      }
    };
    getTraining();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div>
          <h1 className="font-bold pb-2 text-xl">
            Achieve Your Fitness Goals with <span className="text-[#15803D]">Free Training Courses</span>
          </h1>
          <p>
            Get started with no cost and explore a variety of workout options. Enjoy our free trial courses and take the first step towards a healthier you!
          </p>
        </div>

        <div>
        <Slider {...settings}>
            {training.map((item) => (
              <div key={item._id}>
                <Link to={`/training/${item._id}`}> {/* Link to product details page */}
                  <div>
                    <Products item={item} addItemToCart={addItemToCart} />
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default FreeTraining;
