import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/orders`,
});

export const fetchOrders = () => API.get("/");
export const fetchOrderById = (id) => API.get(`/${id}`);
export const createOrder = (data) => API.post("/", data);
export const updateOrder = (id, data) => API.put(`/${id}`, data);
export const deleteOrder = (id) => API.delete(`/${id}`);