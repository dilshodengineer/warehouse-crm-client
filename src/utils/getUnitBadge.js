export const getUnitBadge = (unit) => {
    switch (unit) {
        case 'kg':
            return { status: "bg-success border text-success border-success", content: "kg" };
        case 'pcs':
            return { status: "bg-warning border text-warning border-warning", content: "dona" };
        case 'l':
            return { status: "bg-info border text-info border-info", content: "litr" };
        default:
            return { status: "bg-secondary border text-secondary border-secondary", content: "miqdor" };
    }
};