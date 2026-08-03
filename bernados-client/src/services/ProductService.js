import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/products`,
});

export const fetchProducts = () => API.get("/");
export const fetchProductById = (id) => API.get(`/${id}`);
export const createProduct = (data) => API.post("/", data);
export const updateProduct = (id, data) => API.put(`/${id}`, data);
export const deleteProduct = (id) => API.delete(`/${id}`);