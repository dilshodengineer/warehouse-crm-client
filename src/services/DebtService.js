import api from "./api";


export const getDebts = async (page = 1) => {
    const { data } = await api.get(`/debts?page=${page}`);
    return data?.data;
}