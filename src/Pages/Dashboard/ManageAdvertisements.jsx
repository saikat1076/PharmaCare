import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2 for better alert handling

const ManageAdvertisements = () => {
  const [medicines, setMedicines] = useState([]); // State to store medicines

  // Fetch medicines from the server
  useEffect(() => {
    axios
      .get("https://pharma-care-server-delta.vercel.app/advertisement")
      .then((response) => {
        setMedicines(response.data);
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);
      });
  }, []);

  // Handle status change to 'Approved'
  const handleApprove = (medicineId) => {
    axios
      .put(`https://pharma-care-server-delta.vercel.app/advertisement/${medicineId}`, { status: "Approved" })
      .then((response) => {
        setMedicines((prevMedicines) =>
          prevMedicines.map((medicine) =>
            medicine._id === medicineId ? { ...medicine, status: "Approved" } : medicine
          )
        );

        // Show success alert using SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Advertisement Approved!',
          text: 'The advertisement has been approved successfully.',
        });
      })
      .catch((error) => {
        console.error("Error approving advertisement:", error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to Approve',
          text: 'There was an error approving the advertisement.',
        });
      });
  };

  // Handle deleting an advertisement
  const handleDelete = (medicineId) => {
    axios
      .delete(`https://pharma-care-server-delta.vercel.app/advertisement/${medicineId}`)
      .then((response) => {
        setMedicines((prevMedicines) =>
          prevMedicines.filter((medicine) => medicine._id !== medicineId)
        );

        Swal.fire({
          icon: 'success',
          title: 'Advertisement Deleted!',
          text: 'The advertisement has been deleted successfully.',
        });
      })
      .catch((error) => {
        console.error("Error deleting advertisement:", error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to Delete',
          text: 'There was an error deleting the advertisement.',
        });
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Manage Advertisements</h1>

      {/* Advertisements Table */}
      <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Medicine Image</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Advertisement Status</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {medicines.length > 0 ? (
            medicines.map((medicine) => (
              <tr key={medicine._id} className="border-t">
                <td className="py-3 px-4 text-sm text-gray-700">
                  <img src={medicine.imageUrl} className="w-20 h-16 object-cover mx-auto" alt="Medicine" />
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">{medicine.status}</td>
                <td className="py-3 px-4 text-sm">
                  {medicine.status === "Pending" && (
                    <button
                      onClick={() => handleApprove(medicine._id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(medicine._id)}
                    className="ml-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-3 px-4 text-sm text-center text-gray-500">
                No medicines found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAdvertisements;
