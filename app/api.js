import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Ensure this matches your FastAPI backend URL

export const registerUser = async (signupData) => {
  const response = await axios.post(`${API_URL}/register`, signupData);
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await axios.post(`${API_URL}/token`, loginData);
  return response.data;
};
