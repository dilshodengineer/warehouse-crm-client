export const formatPrice = (price) => {
    return Number(price).toLocaleString('fr-FR');
};

export const formatPriceInput = (value) => {
    const numeric = value.replace(/\D/g, "");

    if (!numeric) return "";

    return Number(numeric).toLocaleString('fr-FR');
};

export const parsePrice = (value) => {
    return Number(value.replace(/\s/g, ""));
};