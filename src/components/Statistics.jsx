import { formatCurrency } from '../utils/currency'

const StatCard = ({ title, value, color }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:shadow-xl">
    <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
)

const Statistics = ({ expenses }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const highestExpense = Math.max(...expenses.map(expense => expense.amount), 0)
  const latestExpense = expenses.length > 0 
    ? new Date(expenses[expenses.length - 1].date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : 'No expenses yet'

  // Group expenses by category
  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Expenses"
          value={formatCurrency(totalExpenses)}
          color="text-blue-600"
        />
        <StatCard
          title="Number of Expenses"
          value={expenses.length}
          color="text-green-600"
        />
        <StatCard
          title="Highest Expense"
          value={formatCurrency(highestExpense)}
          color="text-red-600"
        />
        <StatCard
          title="Latest Expense"
          value={latestExpense}
          color="text-purple-600"
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Expenses by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(expensesByCategory).map(([category, amount]) => (
            <div key={category} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">{category}</h3>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(amount)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Statistics
