import api from "./api";

export const getTransactions = async (page = 1) => {
    const { data } = await api.get(`/cash?page=${page}`);
    return data?.data;
};

export const createTransaction = async (data) => await api.post('/cash', data);

export const updateTransaction = async (data, id) => await api.post(`/cash/${id}`, data);
