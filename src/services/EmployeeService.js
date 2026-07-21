import api from "./api";

export const getEemployees = async () => {
    const {data} = await api.get('/employees');
    return data?.data;
};

export const createEmpployee = async (data) => {
    await api.post('/employees', data);
};