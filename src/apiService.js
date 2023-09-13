// src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/consumers'; // Replace with your Spring Boot API base URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const forgotPassword = (email) => {
  return apiService.post('/forgotpassword', { email });
};

export const resetPassword = (token, newPassword) => {
  return apiService.post('/resetpassword', { token, newPassword });
};
