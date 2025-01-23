import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/css"; // Correct Swiper CSS import
import Title from "../Shared/Title";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";

const DiscountedMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const navigate = useNavigate(); // For navigation
  const axiosPublic = useAxiosPublic()

  // Fetch discounted medicines
  const fetchDiscountedMedicines = async () => {
    try {
      const response = await axiosPublic.get("/medicines?discountOnly=true");
      setMedicines(response.data); // Set medicines to state
    } catch (error) {
      console.error("Error fetching discounted medicines:", error);
    }
  };

  useEffect(() => {
    fetchDiscountedMedicines(); // Fetch data on component load
  }, []);

  // Calculate discounted price for each medicine
  const getDiscountedPrice = (price, discount) => {
    return (price - (price * discount) / 100).toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-2">
     
     <Title subHeading='Discounted Medicines' heading='pay less, save more'></Title>
      <Swiper
        spaceBetween={20} // Space between slides
        slidesPerView={3} // Number of slides visible at once
        loop={true} // Enable loop
        autoplay={{
          delay: 3000, // Time in ms before auto-swiping to the next slide (3 seconds)
          disableOnInteraction: false, // Allow autoplay to continue even if user interacts
        }} // Auto swipe every 3 seconds
        breakpoints={{
          640: { slidesPerView: 1 },  // 1 card per row on small screens
          768: { slidesPerView: 2 },  // 2 cards per row on medium screens
          1024: { slidesPerView: 3 }, // 3 cards per row on larger screens
        }}
        className="mySwiper"
      >
        {medicines.map((medicine) => (
          <SwiperSlide key={medicine._id}>
            <div
              className="bg-white rounded-lg shadow-xl overflow-hidden relative cursor-pointer flex flex-col lg:flex-row h-56" // Fixed height here
              onClick={() => navigate("/shop")} // Navigate to /shop page on click
            >
              {/* Discount Badge */}
              <div className="absolute top-2 left-0 bg-red-500 text-white px-2 py-1 text-xs rounded">
                {medicine.discountPercentage}% Off
              </div>
              {/* Medicine Image */}
              <img
                src={medicine.image}
                alt={medicine.itemName}
                className="w-full h-32 object-cover lg:w-2/4 lg:h-full" // Adjust image height
              />
              {/* Medicine Details */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <h2 className="text-2xl font-semibold">{medicine.itemName}</h2>
                <p className="text-sm text-gray-500 font-medium mt-1">{medicine.company}</p>
                <p className="text-sm text-gray-500 font-medium mt-1">{medicine.shortDescription}</p> {/* Short description */}
                <div className="flex items-center justify-between mt-2">
                  {/* Prices */}
                  <div>
                    <p className="text-red-600 font-semibold text-lg">
                      ৳ {getDiscountedPrice(medicine.perUnitPrice, medicine.discountPercentage)}
                    </p>
                    <p className="text-gray-400 line-through text-sm">
                      ৳ {medicine.perUnitPrice}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DiscountedMedicines;
