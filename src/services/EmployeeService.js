import api from "./api";

export const getEemployees = async () => {
    const {data} = await api.get('/employees');
    return data?.data;
};

export const getEmployee = async (id) => {
    const {data} = await api.get(`/employees/${id}`);
    return data?.data;
};

export const createEmployee = async (data) => {
    await api.post('/employees', data);
};

export const updateEmployee = async (id, data) => await api.put(`/employees/${id}`, data);