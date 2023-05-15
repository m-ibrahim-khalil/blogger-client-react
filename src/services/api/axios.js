import axios from 'axios';

// const API_BASE_URL = 'api/v1';
// const API_BASE_URL = 'http://localhost:3001/api/v1';

const Axios = axios.create({
  // baseURL: API_BASE_URL,
  timeout: 50000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Axios;
