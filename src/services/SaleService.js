import api from "./api";

export const getSalesHistory = async (page = 1) => {
  const { data } = await api.get(`/sales?page=${page}`);
  return data?.data;
};

export const getSale = async (id) => {
  const { data } = await api.get(`/sales/${id}`);
  return data?.data;
};

export const createSale = async (data) => await api.post('/sales', data);

export const updateSale = async (id, data) => await api.put(`/sales/${id}`, data);

