import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/categories`,
});

export const fetchCategories = () => API.get("/");
export const fetchCategoryById = (id) => API.get(`/${id}`);
export const createCategory = (data) => API.post("/", data);
export const updateCategory = (id, data) => API.put(`/${id}`, data);
export const deleteCategory = (id) => API.delete(`/${id}`);