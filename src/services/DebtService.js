import api from "./api";


export const getDebts = async (page = 1) => {
    const { data } = await api.get(`/debts?page=${page}`);
    return data?.data;
}

export const getDebt = async (id) => {
    const { data } = await api.get(`/debts/${id}`);
    return data;
}

export const payForDebt = async (id, data) => {
    await api.put(`/debts/${id}`, data);
}