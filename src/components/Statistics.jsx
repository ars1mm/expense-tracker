import { useState } from 'react'
import { formatCurrency, convertCurrency } from '../utils/currency'
import CurrencySelector from './CurrencySelector'
import PropTypes from 'prop-types'

const StatCard = ({ title, value, color, children }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:shadow-xl">
    <div className="flex items-center justify-between gap-4 mb-2">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      {children}
    </div>
    <p className={`text-2xl font-bold ${color} min-w-[120px]`}>{value}</p>
  </div>
)

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  children: PropTypes.node
}

const Statistics = ({ expenses }) => {
  const [displayCurrency, setDisplayCurrency] = useState('MKD')

  // Convert and sum all expenses to the selected currency
  const totalExpenses = expenses.reduce((sum, expense) => {
    const convertedAmount = convertCurrency(
      expense.amount,
      expense.currency,
      displayCurrency
    )
    return sum + convertedAmount
  }, 0)

  // Convert highest expense to selected currency
  const highestExpense = Math.max(
    ...expenses.map(expense => 
      convertCurrency(expense.amount, expense.currency, displayCurrency)
    ),
    0
  )

  const latestExpense = expenses.length > 0 
    ? new Date(expenses[0].date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : 'No expenses yet'

  // Group expenses by category (in selected currency)
  const expensesByCategory = expenses.reduce((acc, expense) => {
    const convertedAmount = convertCurrency(
      expense.amount,
      expense.currency,
      displayCurrency
    )
    acc[expense.category] = (acc[expense.category] || 0) + convertedAmount
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Expenses"
          value={formatCurrency(totalExpenses, displayCurrency)}
          color="text-blue-600"
        >
          <div className="w-32">
            <CurrencySelector
              selectedCurrency={displayCurrency}
              onCurrencyChange={setDisplayCurrency}
              compact={true}
            />
          </div>
        </StatCard>
        <StatCard
          title="Number of Expenses"
          value={expenses.length.toString()}
          color="text-green-600"
        />
        <StatCard
          title="Highest Expense"
          value={formatCurrency(highestExpense, displayCurrency)}
          color="text-red-600"
        />
        <StatCard
          title="Latest Expense"
          value={latestExpense}
          color="text-purple-600"
        />
      </div>

      {/* Category breakdown */}
      {Object.keys(expensesByCategory).length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-4">Expenses by Category</h3>
          <div className="space-y-3">
            {Object.entries(expensesByCategory)
              .sort(([, a], [, b]) => b - a)
              .map(([category, amount]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-gray-600">{category}</span>
                  <span className="font-medium min-w-[100px] text-right">
                    {formatCurrency(amount, displayCurrency)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

Statistics.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    })
  ).isRequired
}

export default Statistics
