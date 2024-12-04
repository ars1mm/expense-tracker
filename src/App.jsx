import { useState, useEffect } from 'react'
import './App.css'
import ExpensesList from './components/ExpensesList'
import ExpenseForm from './components/ExpenseForm'
import Statistics from './components/Statistics'
import Auth from './components/Auth'
import { auth } from './config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { 
  getExpenses as getExpensesFromSupabase, 
  addExpense as addExpenseToSupabase, 
  deleteExpense as deleteExpenseFromSupabase,
  subscribeToExpenses 
} from './services/supabase'
import { FaMoon, FaSun } from 'react-icons/fa'
import { validateEnv } from './utils/env'

function App() {
  const [expenses, setExpenses] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    // Validate environment variables
    try {
      validateEnv()
    } catch (error) {
      console.error('Environment validation failed:', error)
    }

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
      if (!currentUser) {
        setExpenses([])
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    let unsubscribe = null

    const setupSubscription = async () => {
      if (user) {
        try {
          // Initial fetch
          const data = await getExpensesFromSupabase(user.uid)
          setExpenses(data)
          setLoading(false)

          // Set up real-time subscription
          unsubscribe = subscribeToExpenses((payload) => {
            console.log('Handling real-time update:', payload)
            
            if (payload.eventType === 'INSERT') {
              setExpenses(prev => {
                const newExpense = payload.new
                // Check if expense already exists
                if (prev.some(exp => exp.id === newExpense.id)) {
                  return prev
                }
                // Add new expense and sort by date
                const updated = [newExpense, ...prev]
                return updated.sort((a, b) => new Date(b.date) - new Date(a.date))
              })
            } 
            else if (payload.eventType === 'DELETE') {
              setExpenses(prev => prev.filter(exp => exp.id !== payload.old.id))
            }
          }, user.uid)
        } catch (error) {
          console.error('Error setting up expenses:', error)
          setLoading(false)
        }
      } else {
        setExpenses([])
        setLoading(false)
      }
    }

    setupSubscription()

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [user])

  const addExpense = async (newExpense) => {
    if (user) {
      try {
        const savedExpense = await addExpenseToSupabase(newExpense, user.uid)
        // Optimistically add to state
        setExpenses(prev => {
          const updated = [savedExpense, ...prev]
          return updated.sort((a, b) => new Date(b.date) - new Date(a.date))
        })
      } catch (error) {
        console.error('Error adding expense:', error)
      }
    }
  }

  const handleExpenseDeleted = async (id) => {
    if (user) {
      try {
        // Optimistically remove from state
        setExpenses(prev => prev.filter(exp => exp.id !== id))
        await deleteExpenseFromSupabase(id, user.uid)
      } catch (error) {
        console.error('Error deleting expense:', error)
        // Fetch expenses again if delete fails
        const data = await getExpensesFromSupabase(user.uid)
        setExpenses(data)
      }
    }
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
