export const formatPrice = (price) => {
    return price.toLocaleString('fr-FR');
};

export const formatPriceInput = (value) => {
    const numeric = value.replace(/\s/g, "").replace(/\D/g, "");

    if (!numeric) return "";

    return Number(numeric).toLocaleString('fr-FR');
};

export const parsePrice = (value) => {
    return Number(value.replace(/\s/g, ""));
};