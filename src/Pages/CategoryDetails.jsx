import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // Import useParams to get the dynamic category name from the URL
import Title from "../Components/Shared/Title";
import { Modal } from "../Components/Shared/Modal";
import { AiOutlineEye, AiOutlineShoppingCart } from 'react-icons/ai';   // Modal for displaying medicine details
import useAxiosPublic from "../Hooks/UseAxiosPublic";

const CategoryDetails = () => {
  const { category } = useParams();  // Get the category name from the URL
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null); 
  const axiosPublic = useAxiosPublic(); // Track selected medicine for modal

  // Fetch medicines based on the selected category
  const fetchMedicines = async () => {
    try {
      const response = await axiosPublic.get(`/medicines/?category=${category}`);
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  useEffect(() => {
    fetchMedicines();  // Fetch medicines when the component loads
  }, [category]);

  // Handle eye button click (view medicine details)
  const handleEyeClick = (medicine) => {
    setSelectedMedicine(medicine);  // Show medicine details in modal
  };

  // Handle select button click (add medicine to cart)
  const handleSelectClick = (medicine) => {
    console.log(`${medicine.itemName} added to cart`);
    // Add the medicine to the cart (you can extend this functionality)
  };

  return (
    <div className="container mx-auto px-4 lg:pt-10">
      <Title subHeading={`Medicines in ${category}`} heading={`Explore ${category} Medicines`} />
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

      {/* Modal for showing selected medicine details */}
      {selectedMedicine && (
        <Modal
          medicine={selectedMedicine}
          onClose={() => setSelectedMedicine(null)}
        />
      )}
    </div>
  );
};

export default CategoryDetails;
