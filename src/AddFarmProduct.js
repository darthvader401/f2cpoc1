

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function AddFarmProduct() {
  const [formData, setFormData] = useState({
    cropName: '',
    cropSubType: '',
    cropRetailPrice: '',
    cropWholesalePrice: '',
    cropQuantity: '',
    Description: '',
    files: [],
    perishable: '',
    status: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Include your JWT access token from the cookie or wherever it's stored
    const accessToken = Cookies.get('accessToken');
    const farmerId = localStorage.getItem("farmerId");
    //const farmerId = match.params.farmerId;
console.log(accessToken);
console.log(farmerId);
    // Create a FormData object to send as a multipart/form-data request
    const data = new FormData();
    data.append('cropName', formData.cropName);
    data.append('cropSubType', formData.cropSubType);
    data.append('cropRetailPrice', formData.cropRetailPrice);
    data.append('cropWholesalePrice', formData.cropWholesalePrice);
    data.append('cropQuantity', formData.cropQuantity);
    data.append('Description', formData.Description);
    for (let i = 0; i < formData.files.length; i++) {
      data.append('files', formData.files[i]);
    }
    data.append('perishable', formData.perishable);
    data.append('status', formData.status);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/rolef/addNewFarmProduct/${farmerId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data', // Set content type for form data
          },
        }
      );

      console.log('API response:', response.data);
    } catch (error) {
      console.error('API error:', error);
    }
  };
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
    setFormData({ ...formData, files: selectedFiles });
  };
  const handleChange = (e) => {
    // if (e.target.name === 'files') {
    //   // Handle file input separately
    //   setFormData({ ...formData, files: e.target.files });
    // } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   // }
  };

  return (
    <div>
      <h2>Crop Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Crop Name:</label>
          <input
            type="text"
            name="cropName"
            value={formData.cropName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Crop SubType:</label>
          <input
            type="text"
            name="cropSubType"
            value={formData.cropSubType}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Retail Price:</label>
          <input
            type="number"
            name="cropRetailPrice"
            value={formData.cropRetailPrice}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Wholesale Price:</label>
          <input
            type="number"
            name="cropWholesalePrice"
            value={formData.cropWholesalePrice}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Crop Quantity:</label>
          <input
            type="number"
            name="cropQuantity"
            value={formData.cropQuantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Files:</label>
          <input
            type="file"
            name="files"
            onChange={handleFileChange}
            multiple
          />
        </div>
        <div>
          <label>Perishable:</label>
          <input
            type="text"
            name="perishable"
            value={formData.perishable}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <Link to="/">Back to Home</Link>
    </div>
  );
}


export default AddFarmProduct;
