import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Title from "../Components/Shared/Title";
import { Modal } from "../Components/Shared/Modal";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import useAxiosPublic from "../Hooks/UseAxiosPublic";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import useCart from "../Hooks/useCart";
import { Helmet } from "react-helmet";

const CategoryDetails = () => {
  const { category } = useParams();
  const [medicines, setMedicines] = useState([]);
  const { user } = useContext(AuthContext);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const axiosPublic = useAxiosPublic();
  const [, refetch] = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axiosPublic
      .get(`/medicines/?category=${category}`)
      .then((response) => setMedicines(response.data))
      .catch((error) => console.error("Error fetching medicines:", error));
  }, [category]);

  const handleEyeClick = (medicine) => {
    setSelectedMedicine(medicine);
  };

  const handleCartClick = (medicine) => {
    if (user && user.email) {
      const cartItem = {
        medicineId: medicine._id,
        email: user.email,
        itemName: medicine.itemName,
        genericName: medicine.genericName,
        image: medicine.image,
        category: medicine.category,
        company: medicine.company,
        perUnitPrice: medicine.perUnitPrice,
        discountPercentage: medicine.discountPercentage,
      };

      axios
        .post("https://pharma-care-server-delta.vercel.app/carts", cartItem)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${medicine.itemName} added to your cart`,
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        });
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add to the cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth/login");
        }
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>PharmaCare | {category} Medicines</title>
      </Helmet>

      <div className="container mx-auto px-4 pt-10">
        <Title subHeading={`Medicines in ${category}`} heading={`Explore ${category} Medicines`} />

        {/* Responsive Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {medicines.map((medicine) => (
            <div key={medicine._id} className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105">
              {/* Image */}
              <img src={medicine.image} alt={medicine.itemName} className="w-full h-48 object-cover" />

              {/* Discount Badge */}
              {medicine.discountPercentage > 0 && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs md:text-sm px-3 py-1 rounded-full shadow-md">
                  {medicine.discountPercentage}% OFF
                </div>
              )}

              {/* Medicine Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{medicine.itemName}</h3>
                <p className="text-sm text-gray-500">{medicine.genericName}</p>
                <p className="text-sm text-gray-500">{medicine.company}</p>

                {/* Price */}
                <div className="flex items-center justify-between mt-3">
                  {medicine.discountPercentage > 0 ? (
                    <>
                      <span className="text-lg font-bold text-red-500">
                        ${(medicine.perUnitPrice * (1 - medicine.discountPercentage / 100)).toFixed(2)}
                      </span>
                      <span className="text-sm line-through text-gray-400">${medicine.perUnitPrice}</span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-green-600">${medicine.perUnitPrice}</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition"
                    onClick={() => handleEyeClick(medicine)}
                  >
                    <AiOutlineEye size={20} />
                    <span className="text-sm">View</span>
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition"
                    onClick={() => handleCartClick(medicine)}
                  >
                    <AiOutlineShoppingCart size={20} />
                    <span className="text-sm">Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedMedicine && <Modal medicine={selectedMedicine} onClose={() => setSelectedMedicine(null)} />}
      </div>
    </>
  );
};

export default CategoryDetails;
