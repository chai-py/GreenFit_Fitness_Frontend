import React from 'react';
import list from '../../public/list.json';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Products from './products';

function FreeTraining( {item}) {
    const filterData = list.filter((data) => data.category === "Free");
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
    <div className=' max-w-screen-2xl container mx-auto md:px-20 px-4'>
      <div>
    <h1 class="font-bold pb-2 text-xl">Achieve Your Fitness Goals with <span class="text-[#15803D]">Free Training Courses</span></h1>
      <p>Get started with no cost and explore a variety of workout options. Enjoy our free trial courses and take the first step towards a healthier you!</p>
    </div>
    
    <div>
    <Slider {...settings}>
       {filterData.map((item)=>(
        <Products item={item} key={item.id} />
       ))}
      </Slider>
    </div>
    </div>
    </>
  );
}
export default FreeTraining
