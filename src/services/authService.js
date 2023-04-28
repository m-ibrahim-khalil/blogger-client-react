import Axios from './api/axios';

export async function register(userData) {
  try {
    const response = await Axios.post(`auth/register`, userData, {
      withCredentials: true,
    });
    return { status: 'REGISTER_SUCCESS', payload: response.data };
  } catch (err) {
    return {
      status: 'REGISTER_FAIL',
      payload: err.response.data.message,
    };
  }
}

export async function login(userData) {
  try {
    const response = await Axios.post(`auth/login`, userData, {
      withCredentials: true,
    });
    return { status: 'LOGIN_SUCCESS', payload: response.data };
  } catch (err) {
    return {
      status: 'LOGIN_FAIL',
      payload: err.response.data.message,
    };
  }
}
