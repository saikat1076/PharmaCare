import React, { useState } from 'react';
import axios from 'axios';

const AddModal = ({ setShowModal, setCategory }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImageUrl, setCategoryImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isUrl, setIsUrl] = useState(true); // Flag to toggle between URL and file upload
  const [medicineCount, setMedicineCount] = useState(0); // New field for medicine count

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = categoryImageUrl;

    // If an image is uploaded, handle the file upload
    if (!isUrl && imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);

      try {
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        imageUrl = response.data.imageUrl; // Assuming the API returns the image URL
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    const newCategory = {
      category: categoryName,
      image: imageUrl,
      medicineCount: medicineCount, // Include the medicine count
    };

    try {
      const response = await axios.post('http://localhost:5000/category', newCategory);
      setCategory(prevCategories => [...prevCategories, response.data]); // Update the category list immediately
      setShowModal(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">Category Name</label>
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          {/* Medicine Count Input */}
          <div className="form-control mb-4">
            <label className="label">Medicine Count</label>
            <input
              type="number"
              min="0"
              placeholder="Medicine Count"
              value={medicineCount}
              onChange={(e) => setMedicineCount(Number(e.target.value))}
              className="input input-bordered"
              required
            />
          </div>

          {/* Toggle between URL input and file upload */}
          <div className="form-control mb-4">
            <label className="label">Choose Category Image Method</label>
            <div className="flex items-center">
              <label className="mr-4">
                <input
                  type="radio"
                  name="image-method"
                  checked={isUrl}
                  onChange={() => setIsUrl(true)}
                />
                &nbsp; Enter Image URL
              </label>
              <label>
                <input
                  type="radio"
                  name="image-method"
                  checked={!isUrl}
                  onChange={() => setIsUrl(false)}
                />
                &nbsp; Upload Image
              </label>
            </div>
          </div>

          {/* If 'Enter Image URL' is selected */}
          {isUrl ? (
            <div className="form-control mb-4">
              <label className="label">Category Image URL</label>
              <input
                type="text"
                placeholder="Image URL"
                value={categoryImageUrl}
                onChange={(e) => setCategoryImageUrl(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
          ) : (
            // If 'Upload Image' is selected
            <div className="form-control mb-4">
              <label className="label">Upload Image</label>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="input input-bordered"
                required
              />
            </div>
          )}

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">Save Category</button>
            <button type="button" onClick={() => setShowModal(false)} className="btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
