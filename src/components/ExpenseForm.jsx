import { useState } from 'react'
import PropTypes from 'prop-types'
import CurrencySelector from './CurrencySelector'
import { addExpense } from '../services/supabase'

const ExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    currency: 'MKD'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const categories = [
    'Food',
    'Transportation',
    'Entertainment',
    'Utilities',
    'Shopping',
    'Healthcare',
    'College Fees',
    'Gifts',
    'Others',
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const expenseData = {
        ...formData,
        amount: parseFloat(formData.amount)
      }
      const savedExpense = await addExpense(expenseData)
      onAddExpense(savedExpense)
      setFormData({
        description: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        currency: 'MKD'
      })
    } catch (err) {
      setError('Failed to add expense. Please try again.')
      console.error('Error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 transform transition-all hover:shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Add New Expense</h2>
        <div className="w-48">
          <CurrencySelector
            selectedCurrency={formData.currency}
            onCurrencyChange={(currency) => setFormData(prev => ({ ...prev, currency }))}
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="description">
              Description
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all text-black"
              id="description"
              type="text"
              name="description"
              placeholder="What did you spend on?"
              value={formData.description}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-black" htmlFor="amount">
              Amount
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all text-black"
              id="amount"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              step="any"
              placeholder="Enter amount"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-black" htmlFor="category">
              Category
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all appearance-none text-black"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-black" htmlFor="date">
              Date
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all text-black"
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Adding...' : 'Add Expense'}
          </button>
        </div>
      </form>
    </div>
  )
}

ExpenseForm.propTypes = {
  onAddExpense: PropTypes.func.isRequired
}

export default ExpenseForm
