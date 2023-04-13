import axiosInstance from "../utils/axios";


export async function register(userData) {
    try {
        const response = await axiosInstance.post(`auth/register`, userData, {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        return err.response.data.message;
    }
}

export async function login(userData) {
    try {
        const response = await axiosInstance.post(`auth/login`, userData, {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        return err.response.data.message;
    }
}
