import React, { useState, useEffect } from 'react';

import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/autoplay';


import { FreeMode, Thumbs, Autoplay } from 'swiper/modules';

const CustomSwiper = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null); 

  useEffect(() => {

    fetch('https://pharma-care-server-delta.vercel.app/advertisement')
      .then((res) => res.json())
      .then((data) => {
 
        const approvedAds = data.filter(ad => ad.status === 'Approved');
        setAdvertisements(approvedAds);
      })
      .catch((err) => {
        console.error('Error fetching advertisements:', err);
      });
  }, []);

  return (
    <div className="relative">

      <SwiperComponent
        style={{
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        autoplay={{
          delay: 5000, 
          disableOnInteraction: false, 
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs, Autoplay]} 
        className="mySwiper2"
      >
        {advertisements.map((ad) => (
          <SwiperSlide key={ad._id}>
            <div className="relative">
              <img
                src={ad.imageUrl}
                alt={ad.description}
                className="w-full max-h-[500px] object-contain"
              />
              
            </div>
          </SwiperSlide>
        ))}
      </SwiperComponent>
      

      <SwiperComponent
        onSwiper={setThumbsSwiper}  
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
