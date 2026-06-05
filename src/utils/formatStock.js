export const formatStock = (unit, stock) => {
    
    if (stock == null) return '-';

    switch (unit) {
        case 'pcs':
            return Number(stock);

        case 'kg':
        case 'l':
        default:
            return stock;
    }
};