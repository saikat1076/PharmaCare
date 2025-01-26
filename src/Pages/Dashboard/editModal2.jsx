import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditModal2 = ({ setShowEditModal, editMedicine, queryClient }) => {
  const [updatedMedicine, setUpdatedMedicine] = useState({
    itemName: '',
    genericName: '',
    shortDescription: '',
    image: '',
    category: '',
    company: '',
    itemMassUnit: '',
    perUnitPrice: 0,
    discountPercentage: 0,
    sellerEmail: '',
  });

  // Populate the form with initial values if editMedicine is provided
  useEffect(() => {
    if (editMedicine) {
      setUpdatedMedicine({
        itemName: editMedicine.itemName,
        genericName: editMedicine.genericName,
        shortDescription: editMedicine.shortDescription,
        image: editMedicine.image,
        category: editMedicine.category,
        company: editMedicine.company,
        itemMassUnit: editMedicine.itemMassUnit,
        perUnitPrice: editMedicine.perUnitPrice,
        discountPercentage: editMedicine.discountPercentage,
        sellerEmail: editMedicine.sellerEmail,
      });
    }
  }, [editMedicine]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMedicine((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle update submission
  const handleUpdate = async () => {
    try {
      console.log('Updating medicine with:', updatedMedicine);

      const response = await axios.put(
        `https://pharma-care-server-delta.vercel.app/medicines/${editMedicine._id}`,
        updatedMedicine
      );

      console.log('Response from server:', response.data);

      queryClient.invalidateQueries({ queryKey: ['medicines'] });

      toast.success('Medicine updated successfully!');
      setShowEditModal(false); // Close the modal after update
    } catch (error) {
      console.error('Error updating medicine:', error.response ? error.response.data : error.message);
      toast.error('Failed to update medicine');
    }
  };

  if (!editMedicine) {
    return null; // Optional: show loading spinner or message if editMedicine is not available
  }

  // Form Fields
  const fields = [
    { label: 'Item Name', name: 'itemName', type: 'text' },
    { label: 'Generic Name', name: 'genericName', type: 'text' },
    { label: 'Short Description', name: 'shortDescription', type: 'text' },
    { label: 'Image URL', name: 'image', type: 'url' },
    { label: 'Category', name: 'category', type: 'text' },
    { label: 'Company', name: 'company', type: 'text' },
    { label: 'Item Mass Unit', name: 'itemMassUnit', type: 'text' },
    { label: 'Price per Unit', name: 'perUnitPrice', type: 'number' },
    { label: 'Discount Percentage', name: 'discountPercentage', type: 'number' },
    { label: 'Seller Email', name: 'sellerEmail', type: 'email' },
  ];

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="modal modal-open w-full max-w-4xl bg-white p-1 rounded-lg shadow-xl">
        <h3 className="text-2xl font-semibold text-center mb-1">Edit Medicine</h3>

        {/* Form Fields with 2-column grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.name} className="mb-1">
              <label htmlFor={field.name} className="block text-white text-sm font-medium">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                value={updatedMedicine[field.name]}
                onChange={handleChange}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                className="input input-bordered w-full px-4 py-1 rounded-lg mt-2"
                required
              />
            </div>
          ))}
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={handleUpdate}
            className="btn btn-primary px-6 py-2 text-white rounded-lg"
          >
            Save
          </button>

          <button
            onClick={() => setShowEditModal(false)}
            className="btn btn-secondary px-6 py-2 text-gray-700 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal2;
