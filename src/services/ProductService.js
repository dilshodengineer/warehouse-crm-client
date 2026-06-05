import api from "./api";

export const getProducts = async () => {
    const { data } = await api.get('/products');
    return data?.data?.data; // returns array
};

export const getProduct = async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data?.data; // returns object
};

export const createProduct = (data) => api.post('/products', data);

export const updateProduct = (id, data) => api.put(`/products/${id}`, data);

export const deleteProduct = (id) => api.delete(`/products/${id}`);