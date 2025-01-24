import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddModal from './addModal'; // Importing modal component
import EditModal from './editModal'; // Importing edit modal component

// Fetch categories from API
const fetchCategory = async () => {
  const response = await axios.get('http://localhost:5000/category');
  return response.data;
};

// Manage categories component
const ManageCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const queryClient = useQueryClient(); // Access the query client

  // Fetch category data
  const { data: category, isLoading, isError } = useQuery({
    queryKey: ['category'],
    queryFn: fetchCategory,
  });

  // Delete mutation
  const deleteCategory = async (id) => {
    await axios.delete(`http://localhost:5000/category/${id}`);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category'] }); // Refetch categories after deletion
      toast.success('Category deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete category');
    },
  });

  // Handle deletion of category
  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  // Handle edit action
  const handleEdit = (item) => {
    setEditCategory(item);
    setShowEditModal(true);
  };

  // Mutation to add a new category
  const addCategoryMutation = useMutation({
    mutationFn: async (newCategory) => {
      const response = await axios.post('http://localhost:5000/category', newCategory);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category'] }); // Refetch categories after adding
      toast.success('Category added successfully!');
      setShowModal(false); // Close modal on success
    },
    onError: () => {
      toast.error('Failed to add category');
    },
  });

  // Handle loading and error states
  if (isLoading) return <div>Loading categories...</div>;
  if (isError) return <div>Error loading categories.</div>;

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
          {category && category.length > 0 ? (
            category.map((item) => (
              <tr key={item._id}>
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
                    onClick={() => handleEdit(item)}
                    className="btn btn-secondary mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No categories available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Show AddModal when showModal is true */}
      {showModal && <AddModal setShowModal={setShowModal} addCategoryMutation={addCategoryMutation} />}

      {/* Show EditModal when showEditModal is true */}
      {showEditModal && (
        <EditModal
          setShowEditModal={setShowEditModal}
          editCategory={editCategory}
          queryClient={queryClient} // Pass queryClient to EditModal
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default ManageCategory;
