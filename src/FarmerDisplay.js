import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FarmerDisplay.css';
const FarmerDisplay = () => {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/farmers/getFarmers');
        setFarmers(response.data);
      } catch (error) {
        console.error('Error fetching farmers:', error);
      }
    };

    fetchFarmers();
  }, []);

  return (
    <div>
      <h1>Farmer List</h1>
      <ul>
        {farmers && farmers.map((farmer) => (
          <li key={farmer.id}>
            <p>Name: {farmer.name}</p>
            <p>Phone: {farmer.phone}</p>
            <p>Address: {farmer.address}</p>
            {farmer.image && (
              <img src={`data:image/png;base64,${farmer.image}`} alt={farmer.name} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FarmerDisplay;
