import Axios from './api/axios';

export async function getUsers() {
  try {
    const response = await Axios.get(`users/`, {
      withCredentials: true,
    });
    return { status: 'SUCCESS', payload: response.data.message };
  } catch (err) {
    return {
      status: 'FAIL',
      payload: err.response.data.message,
    };
  }
}

export async function getUserByUsername(username) {
  try {
    const response = await Axios.get(`users/${username}`, {
      withCredentials: true,
    });
    return { status: 'SUCCESS', payload: response.data.message };
  } catch (err) {
    return {
      status: 'FAIL',
      payload: err.response.data.message,
    };
  }
}

export async function updateUserByUsername(username, data) {
  try {
    const response = await Axios.put(`users/${username}`, data, {
      withCredentials: true,
    });
    return { status: 'UPDATE_SUCCESS', payload: response.data.message };
  } catch (err) {
    return { status: 'UPDATE_FAIL', payload: err.response.data.message };
  }
}

export async function deleteUserByUsername(username) {
  try {
    const response = await Axios.delete(`users/${username}`, {
      withCredentials: true,
    });
    return { status: 'DELETE_SUCCESS', payload: response.data.message };
  } catch (err) {
    return { status: 'DELETE_FAIL', payload: err.response.data.message };
  }
}
