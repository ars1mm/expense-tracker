// Hardcoded exchange rates for demonstration
// In a real app, you'd fetch these from an API
const exchangeRates = {
  MKD: 1,
  USD: 55.50,
  EUR: 61.50,
  GBP: 71.20,
  JPY: 0.39,
  CNY: 7.80,
  INR: 0.67,
  AUD: 37.20,
  CAD: 41.30,
  CHF: 64.80,
  RUB: 0.62,
  BRL: 11.40,
};

export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  if (fromCurrency === toCurrency) return amount;
  
  // Convert to MKD first (our base currency)
  const amountInMKD = fromCurrency === 'MKD' 
    ? amount 
    : amount * exchangeRates[fromCurrency];
  
  // Then convert to target currency
  return toCurrency === 'MKD' 
    ? amountInMKD 
    : amountInMKD / exchangeRates[toCurrency];
};

export const formatCurrency = (amount, currencyCode = 'MKD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: currencyCode === 'JPY' ? 0 : 2
  }).format(amount);
};
