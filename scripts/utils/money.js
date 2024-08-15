export function formatCurrency(priceCents){
    return (Math.round(priceCents) * 0.01).toFixed(2);
}
