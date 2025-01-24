import React, { useState } from 'react';

const AddModal = ({ setShowModal, addCategoryMutation }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImageUrl, setCategoryImageUrl] = useState('');
  const [medicineCount, setMedicineCount] = useState(0);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure medicine count is a number (in case the input is a string)
    const newCategory = {
      category: categoryName,
      image: categoryImageUrl,  // Assuming you're using the URL of the image
      medicineCount: Number(medicineCount),  // Convert to a number
    };

    // Trigger the mutation to add the new category
    addCategoryMutation.mutate(newCategory);
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
          
          <div className="form-control mb-4">
            <label className="label">Medicine Count</label>
            <input
              type="number"
              value={medicineCount}
              onChange={(e) => setMedicineCount(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Save Category
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
