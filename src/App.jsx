import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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
      setLoading(false)
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
    <Router>
      <div className="h-screen w-screen bg-gray-50 dark:bg-gray-900 transition-colors overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <Routes>
            <Route 
              path="/" 
              element={
                user ? <Navigate to="/dashboard" /> : <Auth />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                user ? (
                  <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-end mb-4">
                      <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-700" />}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <ExpenseForm onAddExpense={addExpense} />
                        <ExpensesList expenses={expenses} onDeleteExpense={handleExpenseDeleted} />
                      </div>
                      <div className="sticky top-8">
                        <Statistics expenses={expenses} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Navigate to="/" />
                )
              } 
            />
          </Routes>
        )}
      </div>
    </Router>
  )
}

export default App
