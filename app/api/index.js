import axios from 'axios';

export const registerUser = async (userData) => {
  const response = await axios.post('/api/register', userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post('/api/login', userData);
  return response.data;
};
