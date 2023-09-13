import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './App.css'
import { Link } from 'react-router-dom';
function CropDetails() {
  const [cropDetails, setCropDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = Cookies.get('accessToken');
  const farmerId = localStorage.getItem("farmerId");
  useEffect(() => {
    // Define the URL of your backend API
    //const apiUrl = 'http://localhost:8080/api/rolef/getAllCropDetailsForFarmers';

    // Replace 'YOUR_ACCESS_TOKEN' with the actual access token
    //const accessToken = 'YOUR_ACCESS_TOKEN';
    fetchCropDetails();
  }, []);

const fetchCropDetails=() =>{
   
    console.log(accessToken);
    // Set the Authorization header with the access token
    // const headers = {
    //   Authorization: `Bearer ${accessToken}`,
    // };
 
    console.log(farmerId);
    // Make the GET request to the protected endpoint
    axios.get(`http://localhost:8080/api/rolef/getCropDetailsFarmer/${farmerId}`, 
        { 
            headers :{
                Authorization: `Bearer ${accessToken}`,
              } 
        }
        )
        .then((response) => {
        setCropDetails(response.data);
        //console.log(cropDetails)
        
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching crop details:', error);
        setLoading(false);
      });
}

  const handlePublishClick = (cropId) => {
    // Make a PUT or POST request to your API to update the published status
    axios
      .put(`http://localhost:8080/api/rolef/publish/${farmerId}/${cropId}`,null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        //console.log(response.data);
        // Refresh the crop details after publishing
        fetchCropDetails();
      })
      .catch((error) => {
        console.error('Error publishing crop:', error);
      });
  };
  return (
    <div>
      <h2>Crop Details for Farmers</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>  Crop Name  </th>
             
              <th>  Crop Subtype  </th>
              <th>  Retail Price  </th>
              <th>  Wholesale Price  </th>
              <th>  Approval Status  </th>
              <th>  Published  </th> 
              <th>  Actions </th>
       
             
              {/* Include other headers as needed */}
            </tr>
          </thead>
          <tbody>
            {cropDetails.map((crop, index) => (
              <tr key={index}>
                <td>  {crop.cropName}  </td>
               
                <td>  { crop.cropSubType }  </td>
                <td>  { crop.cropRetailPrice }  </td>
                <td>  { crop.cropWholesalePrice }  </td>
                <td>  { crop.approvalStatus ? 'Approved' : 'Pending' }  </td>
               {/*<td>  { crop.published ? 'Published' : '' }  </td>*/} 
               <td>
                  <button
                    onClick={() => handlePublishClick(crop.cropId)}
                    disabled={crop.published} // Disable the button if already published
                    style={{
                        backgroundColor: crop.published ? 'green' : 'red', // Set the color based on the published status
                        color: 'white', // Text color
                        fontWeight: 'bold', // Bold text
                        cursor: 'pointer',
                       
                        padding: '10px 20px', // Increase the padding to make the button bigger
                        fontSize: '16px', // Increase the font size
                        borderRadius: '5px', // Cursor style
                      }}
                  >
                    {crop.published ? 'Published' : 'Publish'}
                  </button>
                </td>
                    <td>
                    <Link
                    to={`/editCrop/${crop.cropId}`} // Specify the edit route
                    style={{
                      marginLeft: '10px', // Add some spacing between buttons
                      textDecoration: 'none', // Remove underlines
                    }}
                  >
                    <button
                      style={{
                        backgroundColor: 'green',
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        padding: '10px 20px',
                        fontSize: '16px',
                        
                        borderRadius: '10px',
                      }}
                    >
                      Edit
                    </button>
                  </Link>
                    </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CropDetails;
