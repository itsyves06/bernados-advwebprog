import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/users`,
});

export const fetchUsers = () => API.get("/");
export const fetchUserById = (id) => API.get(`/${id}`);
export const createUser = (data) => API.post("/", data);
export const updateUser = (id, data) => API.put(`/${id}`, data);
export const deleteUser = (id) => API.delete(`/${id}`);