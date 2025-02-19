import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Title from "./Shared/Title";

// Fake JSON Data (Sample Reviews)
const reviews = [
  {
    id: 1,
    name: "Mohammad Abu Sarwar",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    rating: 5,
    review:
      "One of the best online pharmacies and a trustworthy one too. I've been buying medicine from them for the last 8/9 months. Never disappointed!",
  },
  {
    id: 2,
    name: "RH Nibir",
    image: "https://randomuser.me/api/portraits/men/20.jpg",
    rating: 5,
    review: "They are super fast. Highly recommended!",
  },
  {
    id: 3,
    name: "Iearul Abid",
    image: "https://randomuser.me/api/portraits/men/30.jpg",
    rating: 5,
    review: "Great delivery service and well-organized customer support. Recommend!",
  },
  {
    id: 4,
    name: "Rezwana Angana",
    image: "https://randomuser.me/api/portraits/women/40.jpg",
    rating: 4.5,
    review:
      "Excellent service, good behavior, and fast delivery as promised. I am impressed!",
  },
  {
    id: 5,
    name: "Md. Riazul Islam Riyad",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    rating: 4.5,
    review:
      "Their delivery system is top-notch. Got my delivery so quickly... Satisfied with their service ❤️",
  },
  {
    id: 6,
    name: "Sharmin Akter",
    image: "https://randomuser.me/api/portraits/women/60.jpg",
    rating: 4,
    review: "One of the leading companies. Amazed and their service is very good.",
  },
];

// Star Rating Component
const StarRating = ({ rating }) => {
  return (
    
    <div className="flex text-yellow-500 space-x-1">
      {[...Array(5)].map((_, i) => (
        i + 1 <= rating ? (
          <FaStar key={i} />
        ) : i + 0.5 === rating ? (
          <FaStarHalfAlt key={i} />
        ) : (
          <FaStar key={i} className="text-gray-300" />
        )
      ))}
    </div>
  );
};

// Single Review Card
const ReviewCard = ({ name, image, rating, review }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md rounded-lg p-4 flex flex-col space-y-3 border border-gray-200"
    >
      <div className="flex items-center space-x-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-full border-2 border-gray-300" />
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <StarRating rating={rating} />
        </div>
      </div>
      <p className="text-gray-700 bg-blue-100 p-3 rounded-lg">{review}</p>
    </motion.div>
  );
};

// Main Review Section
const ReviewSection = () => {
  return (
    <div className="py-5 bg-gray-50">
      <div className="container mx-auto pb-2">
      <Title subHeading='Customer Reviews' heading='Pleasures From Our Honorable Customers'></Title>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
