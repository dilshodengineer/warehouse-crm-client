import api from "./api";

export const getCards = async () => {
    const response = await api.get('/dashboard');
    return response.data;
};