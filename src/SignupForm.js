import React, { useState } from "react";
import axios from "axios";
import './Signup.css';

function SignupForm() {
  const [formData, setFormData] = useState({
    phoneNo: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    password: "",
    roles: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (e) => {
    const selectedRoles = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, roles: selectedRoles });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8080/api/auth/signup', formData)
      .then((response) => {
        // Handle success (e.g., show a success message)
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors (e.g., show an error message)
        console.error(error.response.data.message);
      });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="phoneNo">Phone Number</label>
          <input type="text" name="phoneNo" id="phoneNo" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" id="firstName" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" id="lastName" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input type="text" name="address" id="address" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="roles">Select Roles</label>
          <select
            name="roles"
            id="roles"
            multiple
            onChange={handleRoleChange}
            className="custom-dropdown"
            required
          >
            <option value="farmer">Farmer</option>
            <option value="admin">Admin</option>
            <option value="qualitycheck">Quality Check</option>
            <option value="consumer">Consumer</option>
          </select>
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
