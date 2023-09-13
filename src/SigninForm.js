import React, { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
function SigninForm() {
  const [formData, setFormData] = useState({
    phoneNo: "",
    password: "",
  });
//   const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/auth/signin", formData)
      .then((response) => {
     
             // Assuming your API returns the access token in response.data.accessToken
      const accessToken = response.data.accessToken;
      
      // Set the access token as a cookie
      Cookies.set('accessToken', accessToken, { expires: 1 }); // Adjust the expiration as needed

      // Log the cookie data
      console.log('Cookie data:', Cookies.get('accessToken'));
        // // Set the JWT token in an HTTP-only cookie
        // const token = response.data.accessToken;
        // document.cookie = `jwt=${token}; path=/; secure; HttpOnly; SameSite=None`;
        // console.log("data stored in cooke"+document.cookie);
        localStorage.setItem("farmerId", response.data.id);

        // Log the response to the console
        console.log(response.data);

      })
      .catch((error) => {
        // Handle errors (e.g., show an error message)
        console.error(error.response.data.message);
      });
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="phoneNo">Phone Number</label>
          <input
            type="text"
            name="phoneNo"
            id="phoneNo"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>

      {/* {response && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
}

export default SigninForm;
