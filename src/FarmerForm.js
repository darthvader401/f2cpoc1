import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FarmerForm.css'
const FarmerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    image: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
//C:\Users\Atharva Hodage\tCogF2CReact\f2cwebapp
    try {
      const data = new FormData();
    
      data.append('name', formData.name);
      data.append('phone', formData.phone);
      data.append('address', formData.address);
      data.append('image', formData.image);

      await axios.post('http://localhost:8080/farmers/addFarmer', data);
      // Clear form data after successful submission
      setFormData({
       
        name: '',
        phone: '',
        address: '',
        image: null
      });
   
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    navigate('/display');
  };

  return (
    <div className='uploadform'>
      <h2>Farmer Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={handleImageChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FarmerForm;
