import { auth } from '../config/firebase'
import { deleteExpense } from '../services/supabase'
import { formatCurrency } from '../utils/currency'
import PropTypes from 'prop-types'

const ExpensesList = ({ expenses, onExpenseDeleted }) => {
  const handleDelete = async (id) => {
    try {
      const user = auth.currentUser
      if (!user) {
        throw new Error('User not authenticated')
      }
      await deleteExpense(id, user.uid)
      onExpenseDeleted(id)
    } catch (error) {
      console.error('Error deleting expense:', error)
      // You might want to show an error message to the user here
    }
  }

  return (
    <div className="space-y-4 p-4">
      {expenses.map((expense) => (
        <div 
          key={expense.id}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow dark:bg-gray-800 space-y-3 sm:space-y-0"
        >
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 dark:text-blue-300 text-lg">{expense.currency}</span>
            </div>
            <div className="flex-grow sm:flex-grow-0">
              <h3 className="font-medium text-gray-800 dark:text-gray-200">{expense.description}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{expense.date}</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full sm:w-auto space-x-4">
            <div className="text-right">
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {formatCurrency(expense.amount, expense.currency)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{expense.category}</p>
            </div>
            <button
              onClick={() => handleDelete(expense.id)}
              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900"
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
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  onExpenseDeleted: PropTypes.func.isRequired,
}

export default ExpensesList
