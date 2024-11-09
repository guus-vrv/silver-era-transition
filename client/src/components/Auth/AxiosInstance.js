import axios from 'axios';

const axiosInstance = axios.create();

// Add a request interceptor to automatically include the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = token; // No need to prepend 'Bearer' again
    }
    console.log('Config', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
      return response; // Return response if status is not 401
  },
  (error) => {
      if (error.response && error.response.status === 401) {
          console.log('Unauthorized: Redirecting to login page');
          window.location.href = '/login'; // Redirect to login page
      }
      return Promise.reject(error); // Reject the error to handle it later if needed
  }
);

export default axiosInstance;
