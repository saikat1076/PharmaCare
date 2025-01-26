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
import { Helmet } from 'react-helmet';

const Shop = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const axiosPublic = useAxiosPublic();  // Use the axios instance
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [, refetch] = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [medicinesPerPage] = useState(10); // Number of medicines per page
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc' for sorting price

  useEffect(() => {
    axiosPublic.get('/medicines')
      .then((response) => {
        setMedicines(response.data);  // Update state with fetched data
      })
      .catch((error) => {
        console.error("There was an error fetching the medicines data:", error);
      });
  }, [axiosPublic]);

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
      };

      axios.post('https://pharma-care-server-delta.vercel.app/carts', cartItem)
        .then(res => {
          console.log(res.data)
          if (res.data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${medicine.itemName} added to your cart`,
              showConfirmButton: false,
              timer: 1500
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
        confirmButtonText: "Yes, login!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/auth/login');
        }
      });
    }
  };

  // Handle Search
  const filteredMedicines = medicines.filter(medicine => {
    return (
      medicine.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Handle Sorting by Price
  const sortedMedicines = filteredMedicines.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.perUnitPrice - b.perUnitPrice;
    } else {
      return b.perUnitPrice - a.perUnitPrice;
    }
  });

  // Paginate Medicines
  const indexOfLastMedicine = currentPage * medicinesPerPage;
  const indexOfFirstMedicine = indexOfLastMedicine - medicinesPerPage;
  const currentMedicines = sortedMedicines.slice(indexOfFirstMedicine, indexOfLastMedicine);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>PharmaCare | Shop</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container mx-auto pt-10">
        <Title subHeading="Medicine List" heading="Select Medicines you want to Order" />

        {/* Search Input */}
        <div className="mb-4 text-center">
          <input
            type="text"
            placeholder="Search Medicines..."
            className="px-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Sorting and Pagination */}
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>Sort by Price:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>

          {/* Pagination */}
          <div>
            {Array.from({ length: Math.ceil(filteredMedicines.length / medicinesPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Table for larger screens */}
        <div className="lg:block">
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
              {currentMedicines.map((medicine) => (
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

        {/* Modal */}
        {selectedMedicine && (
          <Modal
            medicine={selectedMedicine}
            onClose={() => setSelectedMedicine(null)}
          />
        )}
      </div></>
  );
};

export default Shop;
