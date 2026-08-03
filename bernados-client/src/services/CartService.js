import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/carts`,
});

export const fetchCartItems = () => API.get("/");
export const fetchCartItemById = (id) => API.get(`/${id}`);
export const addToCart = (data) => API.post("/", data);
export const updateCartItem = (id, data) => API.put(`/${id}`, data);
export const removeFromCart = (id) => API.delete(`/${id}`);