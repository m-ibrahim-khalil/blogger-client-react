import Axios from './api/axios';

export async function getBlogs(page = 1, size = 10) {
  try {
    const response = await Axios.get(
      `/api/v1/stories?page=${page - 1}&size=${size}`
    );
    return response.data.message;
  } catch (err) {
    return err.response.data.message;
  }
}

export async function getBlogById(id) {
  try {
    const response = await Axios.get(`/api/v1/stories/${id}`);
    return response.data.message;
  } catch (err) {
    return err.response.data.message;
  }
}

export async function getBlogsByAuthor(authorId, page, size = 10) {
  try {
    const response = await Axios.get(
      `/api/v1/stories/author/${authorId}/?page=${page - 1}&size=${size}`
    );
    return response.data.message;
  } catch (err) {
    return err.response.data.message;
  }
}

export async function createBlog(newBlog) {
  try {
    const response = await Axios.post(`/api/v1/stories/`, newBlog);
    return { status: 'CREATE_SUCCESS', payload: response.data.message };
  } catch (err) {
    return { status: 'CREATE_FAIL', payload: err.response.data.message };
  }
}

export async function updateBlog(id, blog) {
  try {
    const response = await Axios.put(`/api/v1/stories/${id}`, blog);
    return { status: 'UPDATE_SUCCESS', payload: response.data.message };
  } catch (err) {
    return { status: 'UPDATE_FAIL', payload: err.response.data.message };
  }
}

export async function deleteBlog(id) {
  try {
    const response = await Axios.delete(`/api/v1/stories/${id}`);
    return { status: 'DELETE_SUCCESS', payload: response.data.message };
  } catch (err) {
    return { status: 'DELETE_FAIL', payload: err.response.data.message };
  }
}
