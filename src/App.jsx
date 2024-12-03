import { useState, useEffect } from 'react'
import './App.css'
import ExpensesList from './components/ExpensesList'
import ExpenseForm from './components/ExpenseForm'
import Statistics from './components/Statistics'
import Auth from './components/Auth'
import { auth } from './config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getExpenses } from './services/supabase'
import { FaMoon, FaSun } from 'react-icons/fa'

function App() {
  const [expenses, setExpenses] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses()
        setExpenses(data)
      } catch (error) {
        console.error('Error fetching expenses:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchExpenses()
  }, [])

  const addExpense = (newExpense) => {
    setExpenses([newExpense, ...expenses])
  }

  const handleExpenseDeleted = (deletedId) => {
    setExpenses(expenses.filter(expense => expense.id !== deletedId))
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors z-50"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <FaSun className="text-yellow-400 w-5 h-5" /> : <FaMoon className="text-gray-700 dark:text-gray-300 w-5 h-5" />}
      </button>
      
      <Auth user={user} setUser={setUser} darkMode={darkMode} />
      
      {user && (
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <ExpenseForm onAddExpense={addExpense} />
            <Statistics expenses={expenses} />
            {loading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              </div>
            ) : (
              <ExpensesList 
                expenses={expenses} 
                onExpenseDeleted={handleExpenseDeleted} 
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
