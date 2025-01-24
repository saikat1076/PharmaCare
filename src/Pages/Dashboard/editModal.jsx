import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditModal = ({ setShowEditModal, editCategory, queryClient }) => {
  const [updatedCategory, setUpdatedCategory] = useState({
    category: editCategory.category,
    image: editCategory.image,
  });

  // Sync updatedCategory with editCategory prop
  useEffect(() => {
    if (editCategory) {
      setUpdatedCategory({
        category: editCategory.category,
        image: editCategory.image,
      });
    }
  }, [editCategory]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCategory({ ...updatedCategory, [name]: value });
  };

  // Update category
  const handleUpdate = async () => {
    try {
      console.log("Updating category with:", updatedCategory);

      const response = await axios.put(
        `http://localhost:5000/category/${editCategory._id}`,
        updatedCategory
      );
      console.log("Response from update:", response.data);

      // Invalidate and refetch the category data after updating
      queryClient.invalidateQueries({ queryKey: ['category'] }); 

      toast.success('Category updated successfully!');
      setShowEditModal(false); // Close the modal after update
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Failed to update category');
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="modal modal-open w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
        <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Edit Category
        </h3>

        {/* Category Name Input */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-600">
            Category Name
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={updatedCategory.category}
            onChange={handleChange}
            placeholder="Enter category name"
            className="input input-bordered w-full px-4 py-2 rounded-lg mt-2 text-gray-700 border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* Image URL Input */}
        <div className="mb-6">
          <label htmlFor="image" className="block text-sm font-medium text-gray-600">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            id="image"
            value={updatedCategory.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="input input-bordered w-full px-4 py-2 rounded-lg mt-2 text-gray-700 border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        <div className="flex justify-end space-x-4">
          {/* Save Button */}
          <button
            onClick={handleUpdate}
            className="btn btn-primary px-6 py-2 text-white rounded-lg focus:outline-none"
          >
            Save
          </button>
          
          {/* Cancel Button */}
          <button
            onClick={() => setShowEditModal(false)}
            className="btn btn-secondary px-6 py-2 text-gray-700 rounded-lg focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
