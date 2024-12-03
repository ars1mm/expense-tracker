import PropTypes from 'prop-types';

const CurrencySelector = ({ selectedCurrency, onCurrencyChange, compact = false }) => {
  // Common world currencies with their symbols and names
  const currencies = [
    { code: 'MKD', name: 'Macedonian Denar' },
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'RUB', name: 'Russian Ruble' },
    { code: 'BRL', name: 'Brazilian Real' },
  ].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <select
      className={`${
        compact 
          ? 'px-3 py-1 text-sm' 
          : 'px-3 py-1.5 text-sm'
      } w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all appearance-none text-black`}
      id="currency"
      name="currency"
      value={selectedCurrency}
      onChange={(e) => onCurrencyChange(e.target.value)}
      aria-label="Select currency"
    >
      {currencies.map(({ code, name }) => (
        <option key={code} value={code}>
          {compact ? code : `${code} - ${name}`}
        </option>
      ))}
    </select>
  );
};

CurrencySelector.propTypes = {
  selectedCurrency: PropTypes.string.isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
  compact: PropTypes.bool
};

export default CurrencySelector;
