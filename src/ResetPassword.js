import React, { useState } from "react";
import axios from "axios";

const ResetPassword = ({ match }) => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const { token } = match.params;
    try {
      await axios.post(`http://localhost:8080/consumers/resetpassword?token=${token}`, {
        newPassword: password,
      });
      setMessage("Password reset successfully.");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="Enter your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ResetPassword;
