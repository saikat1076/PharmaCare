import React, { useState } from 'react';

const AddModal2 = ({ setShowModal, addMedicinesMutation }) => {
  const [itemName, setItemName] = useState('');
  const [genericName, setGenericName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [company, setCompany] = useState('');
  const [itemMassUnit, setItemMassUnit] = useState('');
  const [perUnitPrice, setPerUnitPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [sellerEmail, setSellerEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState(''); 
  const handleSubmit = (e) => {
    e.preventDefault();

    const newMedicines = {
      itemName,
      genericName,
      shortDescription,
      image: imageUrl,
      company,
      itemMassUnit,
      perUnitPrice: Number(perUnitPrice),
      discountPercentage: Number(discountPercentage),
      sellerEmail,
      category,
    };
    addMedicinesMutation.mutate(newMedicines);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-2xl font-bold mb-4">Add New Medicine</h2>
        <form onSubmit={handleSubmit}>
          {/* Item Name */}
          <div className="form-control mb-4">
            <label className="label">Item Name</label>
            <input
              type="text"
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          {/* Generic Name */}
          <div className="form-control mb-4">
            <label className="label">Generic Name</label>
            <input
              type="text"
              placeholder="Generic Name"
              value={genericName}
              onChange={(e) => setGenericName(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          {/* Short Description */}
          <div className="form-control mb-4">
            <label className="label">Short Description</label>
            <input
              type="text"
              placeholder="Short Description"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          {/* Company */}
          <div className="form-control mb-4">
            <label className="label">Company</label>
            <input
              type="text"
              placeholder="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          {/* Item Mass Unit */}
          <div className="form-control mb-4">
            <label className="label">Item Mass Unit</label>
            <input
              type="text"
              placeholder="Item Mass Unit"
              value={itemMassUnit}
              onChange={(e) => setItemMassUnit(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          {/* Per Unit Price */}
          <div className="form-control mb-4">
            <label className="label">Per Unit Price</label>
            <input
              type="number"
              placeholder="Price per unit"
              value={perUnitPrice}
              onChange={(e) => setPerUnitPrice(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          {/* Discount Percentage */}
          <div className="form-control mb-4">
            <label className="label">Discount Percentage</label>
            <input
              type="number"
              placeholder="Discount Percentage"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          {/* Seller Email */}
          <div className="form-control mb-4">
            <label className="label">Seller Email</label>
            <input
              type="email"
              placeholder="Seller's Email"
              value={sellerEmail}
              onChange={(e) => setSellerEmail(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          {/* Image URL */}
          <div className="form-control mb-4">
            <label className="label">Image URL</label>
            <input
              type="text"
              placeholder="Enter Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          {/* Category */}
          <div className="form-control mb-4">
            <label className="label">Category</label>
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          {/* Modal Action Buttons */}
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Save Medicine
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

export default AddModal2;
