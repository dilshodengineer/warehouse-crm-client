import api from "./api";

export const getSalesHistory = async () => {
  const { data } = await api().get('sales');
  return data?.data?.data;
};

export const getSale = async (id) => {
  const { data } = await api.get(`/sales/${id}`);
  return data?.data;
};

export const createSale = (data) => api.post('/sales', data);

export const updateSale = (id, data) => api.put(`/sales/${id}`, data);

