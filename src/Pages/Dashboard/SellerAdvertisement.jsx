import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import { AuthContext } from "../../Provider/AuthProvider";

const PostAdvertisement = () => {
  const { user } = useContext(AuthContext); // Get the authenticated user
  const [formData, setFormData] = useState({
    imageUrl: "", // Store the image URL
    description: "",
  });
  const [advertisements, setAdvertisements] = useState([]); // State to store advertisements from server

  // Fetch advertisements from the server
  useEffect(() => {
    axios
      .get(`http://localhost:5000/advertisement/email?email=${user.email}`)
      .then((response) => {
        setAdvertisements(response.data);
      })
      .catch((error) => {
        console.error("Error fetching advertisements:", error);
      });
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission for adding advertisement
  const handleAddAdvertise = (e) => {
    e.preventDefault();

    const data = {
      imageUrl: formData.imageUrl, // Send the image URL
      description: formData.description,
      email: user.email,
      status: "Pending", // Set the initial status as 'Pending'
    };

    axios
      .post("http://localhost:5000/advertisement", data)
      .then((response) => {
        Swal.fire({
          title: "Success!",
          text: response.data.message || "Advertisement submitted successfully!",
          icon: "success",
          confirmButtonText: "Okay",
        });

        setFormData({ imageUrl: "", description: "" });

        // Fetch updated advertisements after posting
        axios
          .get(`http://localhost:5000/advertisement/email?email=${user.email}`)
          .then((response) => {
            setAdvertisements(response.data);
          })
          .catch((error) => {
            console.error("Error fetching advertisements:", error);
          });
      })
      .catch((error) => {
        console.error("Error submitting advertisement:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to submit advertisement. Please try again.",
          icon: "error",
          confirmButtonText: "Retry",
        });
      });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 flex space-x-8">
      {/* Post Advertisement Form */}
      <div className="w-1/2">
        <h1 className="text-3xl font-semibold text-center mb-6">Post Advertisement</h1>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Add Advertisement</h2>
          <form onSubmit={handleAddAdvertise}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Medicine Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="Paste the image URL here"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Advertisements Display Section */}
      <div className="w-1/2">
        <h1 className="text-3xl font-semibold text-center mb-6">Advertisements</h1>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Existing Advertisements</h2>

          {advertisements.length > 0 ? (
            <div className="space-y-4">
              {advertisements.map((ad) => (
                <div key={ad._id} className="border p-4 rounded-lg">
                  <div className="flex items-center mb-4">
                    <img
                      src={ad.imageUrl}
                      alt="Advertisement"
                      className="w-20 h-20 object-cover rounded-md mr-4"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold">{ad.description}</h3>
                      <p className="text-sm text-gray-500">{ad.email}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">Status: {ad.status}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No advertisements available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostAdvertisement;
