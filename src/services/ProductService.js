import api from "./api";

export const getProducts = async (page = 1) => {
  const {data} = await api.get(`/products?page=${page}`);
  return data?.data;
};

export const getProduct = async (id) => {
  const {data} = await api.get(`/products/${id}`);
  return data?.data;
};

export const createProduct = (data) => api.post('/products', data);

export const updateProduct = (id, data) => api.put(`/products/${id}`, data);

export const deleteProduct = (id) => api.delete(`/products/${id}`);