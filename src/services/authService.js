import Axios from './api/axios';

export async function register(userData) {
  try {
    const response = await Axios.post(`/api/v1/auth/register`, userData);
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
    const response = await Axios.post(`/api/v1/auth/login`, userData);
    return { status: 'LOGIN_SUCCESS', payload: response.data };
  } catch (err) {
    return {
      status: 'LOGIN_FAIL',
      payload: err.response.data.message,
    };
  }
}
