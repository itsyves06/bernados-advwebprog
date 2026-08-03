import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/reviews`,
});

export const fetchReviews = () => API.get("/");
export const fetchReviewById = (id) => API.get(`/${id}`);
export const createReview = (data) => API.post("/", data);
export const updateReview = (id, data) => API.put(`/${id}`, data);
export const deleteReview = (id) => API.delete(`/${id}`);