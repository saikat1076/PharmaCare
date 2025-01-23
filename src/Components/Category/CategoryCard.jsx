import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import Title from "../Shared/Title";
import { useNavigate } from "react-router-dom";

const CategoryCard = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch categories from MongoDB using Axios
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchCategories(); // Fetch categories when the component loads
  }, []);
  const handleCategory = (item) => {
    // Ensure category is passed correctly
    navigate(`/categoryDetails/${item.category}`);  // Correct route
  };

  return (
    <div className="container mx-auto px-4">
      <Title subHeading='Product Categories' heading='Explore Our Categories' ></Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-aos="zoom-in"
            onClick={() => handleCategory(category)}
          >
            <img
              src={category.image}
              alt={category.category}
              className="w-full h-32 object-cover" // Adjusted image height for smaller size
            />
            <div className="p-2 text-center"> {/* Reduced padding */}
              <h3 className="text-lg font-semibold">{category.category}</h3>
              <p className="text-gray-500 text-sm">
                {category.medicineCount} medicines available
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
