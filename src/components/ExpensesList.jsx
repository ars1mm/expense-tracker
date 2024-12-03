import { formatCurrency } from '../utils/currency'
import { deleteExpense } from '../services/supabase'
import PropTypes from 'prop-types'

const ExpensesList = ({ expenses, onExpenseDeleted }) => {
  const handleDelete = async (id) => {
    try {
      await deleteExpense(id)
      onExpenseDeleted(id)
    } catch (error) {
      console.error('Error deleting expense:', error)
      // You might want to show an error message to the user here
    }
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div 
          key={expense.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-lg">{expense.currency}</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">{expense.description}</h3>
              <p className="text-sm text-gray-500">{expense.date}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-semibold text-gray-800">
                {formatCurrency(expense.amount, expense.currency)}
              </p>
              <p className="text-sm text-gray-500">{expense.category}</p>
            </div>
            <button
              onClick={() => handleDelete(expense.id)}
              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
              title="Delete expense"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

ExpensesList.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    })
  ).isRequired,
  onExpenseDeleted: PropTypes.func.isRequired
}

export default ExpensesList
