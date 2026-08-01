import api from "./api";

export const getDashboard = async () => {
    const response = await api.get("/dashboard");
    return response.data;
};

export const getReport = async (filter) => {
    const response = await api.get("/reports", {
        params: filter,
    });

    return response.data;
};