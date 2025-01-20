import React, { useState } from 'react';
// Import Swiper React components
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/autoplay'; // Import autoplay styles

// Import required modules
import { FreeMode, Thumbs, Autoplay } from 'swiper/modules';

import img1 from '../assets/banner-4.webp';
import img2 from '../assets/banner-2.jpg';
import img3 from '../assets/banner-3.jpg';
import img4 from '../assets/banner-1.jpg';

const CustomSwiper = () => {
  const [thumbsSwiper] = useState(null);

  return (
    <>
      {/* Main Swiper for large images */}
      <SwiperComponent
        style={{
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        autoplay={{
          delay: 5000, // Time in milliseconds (3 seconds) between slides
          disableOnInteraction: false, // Ensures autoplay continues after user interaction
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs, Autoplay]} // Added Autoplay module
        className="mySwiper2"
      >
        <SwiperSlide>
          <img src={img1} className="w-full h-[500px] object-cover rounded-none" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} className="w-full h-[500px] object-cover rounded-none" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} className="w-full h-[500px] object-cover rounded-none" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img4} className="w-full h-[500px] object-cover rounded-none" />
        </SwiperSlide>
      </SwiperComponent>
    </>
  );
};

export default CustomSwiper;
