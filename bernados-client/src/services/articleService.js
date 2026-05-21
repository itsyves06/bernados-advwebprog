import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: `${API_URL}/api/articles`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchArticles = (isPublic = false) => API.get(isPublic ? `?public=true` : `/`);
export const createArticle = (articleData) => API.post("/", articleData);
export const updateArticle = (id, articleData) => API.put(`/${id}`, articleData);
export const deleteArticle = (id) => API.delete(`/${id}`);