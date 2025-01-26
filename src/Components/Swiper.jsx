import React, { useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/autoplay'; // Import autoplay styles

// Import required modules
import { FreeMode, Thumbs, Autoplay } from 'swiper/modules';

const CustomSwiper = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null); // Correctly define setThumbsSwiper

  useEffect(() => {
    // Fetch advertisements data from the API
    fetch('https://pharma-care-server-delta.vercel.app/advertisement')
      .then((res) => res.json())
      .then((data) => {
        // Filter advertisements with status "Approved"
        const approvedAds = data.filter(ad => ad.status === 'Approved');
        setAdvertisements(approvedAds);
      })
      .catch((err) => {
        console.error('Error fetching advertisements:', err);
      });
  }, []);

  return (
    <div className="relative">
      {/* Main Swiper for large images */}
      <SwiperComponent
        style={{
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        autoplay={{
          delay: 5000, // Time in milliseconds (5 seconds) between slides
          disableOnInteraction: false, // Ensures autoplay continues after user interaction
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs, Autoplay]} // Added Autoplay module
        className="mySwiper2"
      >
        {advertisements.map((ad) => (
          <SwiperSlide key={ad._id}>
            <div className="relative">
              <img
                src={ad.imageUrl}
                alt={ad.description}
                className="w-full h-[420px] object-cover rounded-lg shadow-md"
              />
              {/* <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white p-4">
                <p className="text-lg font-semibold">{ad.description}</p>
                <p className="mt-2 text-sm">{`Status: ${ad.status}`}</p>
              </div> */}
            </div>
          </SwiperSlide>
        ))}
      </SwiperComponent>
      
      {/* Thumbnails Swiper for small image previews */}
      <SwiperComponent
        onSwiper={setThumbsSwiper}  // Update the thumbsSwiper when Swiper is initialized
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="mySwiper mt-4"
      >
        {advertisements.map((ad) => (
          <SwiperSlide key={ad._id}>
            <img
              src={ad.imageUrl}
              alt={ad.description}
              className="w-full h-[80px] object-cover rounded-lg cursor-pointer"
            />
          </SwiperSlide>
        ))}
      </SwiperComponent>
    </div>
  );
};

export default CustomSwiper;
