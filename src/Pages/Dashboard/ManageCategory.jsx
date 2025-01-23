import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddModal from './addModal'; // Importing modal component
import EditModal from './editModal'; // Importing edit modal component

const ManageCategory = () => {
  const [category, setCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null); // To track the category being edited

  // Fetching category from the server
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/category');
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching category:', error);
        toast.error('Failed to fetch category');
      }
    };

    fetchCategory();
  }, []);

  // Delete a category
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/category/${id}`);
      setCategory(category.filter((item) => item._id !== id)); // Update the state
      toast.success('Category deleted successfully!');
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    }
  };

  // Handle Edit Button Click
  const handleEdit = (item) => {
    console.log("Setting edit category:", item);  // Ensure the category is correctly passed
    setEditCategory(item); // Set the category to be edited
    setShowEditModal(true); // Open the edit modal
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Category</h2>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          Add Category
        </button>
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Category Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {category.map((item) => (
            <tr key={item._id}> {/* Unique key for each item */}
              <td>{item.category}</td>
              <td>
                <img
                  src={item.image}
                  alt={item.category}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td>
                <button
                  onClick={() => handleEdit(item)} // Open edit modal
                  className="btn btn-secondary mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)} // Pass _id for deletion
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show AddModal */}
      {showModal && <AddModal setShowModal={setShowModal} setCategory={setCategory} />}

      {/* Show EditModal */}
      {showEditModal && (
        <EditModal
          setShowEditModal={setShowEditModal}
          editCategory={editCategory}
          setCategory={setCategory}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default ManageCategory;
