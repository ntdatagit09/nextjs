export const formatPrice = (price: string): string => {
    const parts = price.split('.');
    const formattedParts = parts.map((part, index) => {
        if (index === 0) {
            return part.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        } else {
            return part;
        }
    });
    return formattedParts.join('.');
};