// src/Shop.js
import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineShoppingCart } from 'react-icons/ai'; // Import React Icons
import useAxiosPublic from '../Hooks/UseAxiosPublic';
import { Modal } from '../Components/Shared/Modal';
import Title from '../Components/Shared/Title';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useCart from '../Hooks/useCart';

const Shop = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const axiosPublic = useAxiosPublic();  // Use the axios instance
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const [, refetch] = useCart();

  useEffect(() => {
    // Fetch the medicines data using axiosPublic
    axiosPublic.get('/medicines')
      .then((response) => {
        setMedicines(response.data);  // Update state with fetched data
      })
      .catch((error) => {
        console.error("There was an error fetching the medicines data:", error);
      });
  }, [axiosPublic]);  // Run effect when axiosPublic changes (though it likely won't change)

  const handleEyeClick = (medicine) => {
    setSelectedMedicine(medicine);  // Show medicine details in modal
  };

  const handleCartClick = (medicine) => {
    if (user && user.email) {
      const cartItem = {
        medicineId: medicine._id,
        email: user.email,
        itemName: medicine.itemName,
        genericName: medicine.genericName,
        shortDescription: medicine.shortDescription,
        image: medicine.image,
        category: medicine.category,
        company: medicine.company,
        itemMassUnit: medicine.itemMassUnit,
        perUnitPrice: medicine.perUnitPrice,
        discountPercentage: medicine.discountPercentage,
        sellerEmail: medicine.sellerEmail,

      }
      axios.post('http://localhost:5000/carts', cartItem)
      .then(res => {
          console.log(res.data)
          if (res.data.insertedId) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `${name} added to your cart`,
                showConfirmButton: false,
                timer: 1500
            });
            // refetch cart to update the cart items count
            refetch();
        }
        })
      
      
    } else {
      Swal.fire({
          title: "You are not Logged In",
          text: "Please login to add to the cart?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, login!"
      }).then((result) => {
          if (result.isConfirmed) {
              //   send the user to the login page
              navigate('/auth/login')
          }
      });
  }
    
  };

  return (
    <div className="container mx-auto pt-10">
      <Title subHeading="Medicine List" heading="Select Medicines you want to Order" />
      
      {/* Table for larger screens */}
      <div className="hidden lg:block">
        <table className="table-auto w-full border-collapse text-sm shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Item Name</th>
              <th className="px-4 py-2 border">Generic Name</th>
              <th className="px-4 py-2 border">Company</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border text-center">
                  <img src={medicine.image} alt={medicine.itemName} className="w-20 h-16 object-cover  mx-auto" />
                </td>
                <td className="px-4 py-2 border">{medicine.itemName}</td>
                <td className="px-4 py-2 border">{medicine.genericName}</td>
                <td className="px-4 py-2 border">{medicine.company}</td>
                <td className="px-4 py-2 border">{medicine.category}</td>
                <td className="px-4 py-2 text-red-500 font-bold border">${medicine.perUnitPrice}</td>
                <td className="px-4 py-7 border flex justify-center items-center space-x-4">
                  {/* Eye button */}
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEyeClick(medicine)}
                  >
                    <AiOutlineEye size={24} />
                  </button>

                  {/* Cart button */}
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={() => handleCartClick(medicine)}
                  >
                    <AiOutlineShoppingCart size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for smaller screens */}
      <div className="lg:hidden">
        {medicines.map((medicine) => (
          <div key={medicine._id} className="mb-4 p-4 border rounded-lg shadow-md hover:shadow-lg">
            <div className="flex items-center space-x-4">
              <img src={medicine.image} alt={medicine.itemName} className="w-16 h-16 object-cover rounded-full" />
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{medicine.itemName}</h2>
                <p className="text-gray-500">{medicine.genericName}</p>
                <p className="text-sm text-gray-600">Company: {medicine.company}</p>
                <p className="text-sm text-gray-600">Category: {medicine.category}</p>
                <p className="font-bold text-red-500 text-xl">${medicine.perUnitPrice}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex justify-between space-x-4">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleEyeClick(medicine)}
              >
                <AiOutlineEye size={24} />
              </button>
              <button
                className="text-green-500 hover:text-green-700"
                onClick={() => handleCartClick(medicine)}
              >
                <AiOutlineShoppingCart size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedMedicine && (
        <Modal
          medicine={selectedMedicine}
          onClose={() => setSelectedMedicine(null)}
        />
      )}
    </div>
  );
};

export default Shop;
