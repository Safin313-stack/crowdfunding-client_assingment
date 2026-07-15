import axios from 'axios';
import { API_URL } from '../contexts/AuthContext';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({ baseURL: API_URL });

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use((config) => {
    const token = localStorage.getItem('access-token');
    if (token) config.headers.authorization = `Bearer ${token}`;
    return config;
  });

  axiosSecure.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        await logOut();
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
