export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('mk-MK', {
    style: 'currency',
    currency: 'MKD',
    maximumFractionDigits: 0
  }).format(amount);
};
