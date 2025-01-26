import React, { useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddModal2 from './addModal2'; // Importing modal component
import EditModal2 from './editModal2'; // Importing edit modal component (with capital 'E')
import { AuthContext } from '../../Provider/AuthProvider';

const ManageMedicines = () => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editMedicine, setEditMedicine] = useState(null); // Renamed to match the prop in EditModal2
  const queryClient = useQueryClient();

  const fetchMedicines = async () => {
    if (!user?.email) {
      throw new Error('User email is not available');
    }
    const response = await axios.get(`https://pharma-care-server-delta.vercel.app/medicines/${user.email}`);
    return response.data;
  };

  const { data: medicines, isLoading, isError, error } = useQuery({
    queryKey: ['medicines', user?.email],
    queryFn: fetchMedicines,
    enabled: !!user?.email, // Only fetch when the email is available
  });

  // Delete mutation
  const deletemedicines = async (id) => {
    await axios.delete(`https://pharma-care-server-delta.vercel.app/medicines/${id}`);
  };

  const deleteMutation = useMutation({
    mutationFn: deletemedicines,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
      toast.success('Medicines deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete medicines');
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (item) => {
    console.log("Editing item:", item); // Debugging step
    setEditMedicine(item); // Update the state with the item to be edited
    setShowEditModal(true); // Show the edit modal
  };

  const addMedicinesMutation = useMutation({
    mutationFn: async (newMedicines) => {
      const response = await axios.post('https://pharma-care-server-delta.vercel.app/medicines', newMedicines);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
      toast.success('Medicines added successfully!');
      setShowModal(false);
    },
    onError: () => {
      toast.error('Failed to add medicines');
    },
  });

  // Handle loading and error states
  if (isLoading) return <div>Loading medicines...</div>;
  if (isError) return <div>Error loading medicines: {error.message}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage medicines</h2>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          Add medicines
        </button>
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Medicines Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines && medicines.length > 0 ? (
            medicines.map((item) => (
              <tr key={item._id}>
                <td>{item.itemName}</td>
                <td>
                  <img
                    src={item.image}
                    alt={item.itemName}
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
              <td colSpan="3" className="text-center">No medicines available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Show AddModal2 when showModal is true */}
      {showModal && <AddModal2 setShowModal={setShowModal} addMedicinesMutation={addMedicinesMutation} />}

      {/* Show EditModal when showEditModal is true */}
      {showEditModal && (
        <EditModal2
          setShowEditModal={setShowEditModal}
          editMedicine={editMedicine} // Renamed to editMedicine
          queryClient={queryClient}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default ManageMedicines;
