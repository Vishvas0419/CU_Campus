import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const axiosClient = axios.create({
  baseURL,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('cu_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // Optionally clear token and redirect to login
      localStorage.removeItem('cu_token');
      // If the app uses routing, consider a more sophisticated redirect mechanism
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;

