import { useState, useEffect } from 'react'
import './App.css'
import ExpensesList from './components/ExpensesList'
import ExpenseForm from './components/ExpenseForm'
import Statistics from './components/Statistics'
import Auth from './components/Auth'
import { auth } from './config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getExpenses } from './services/supabase'

function App() {
  const [expenses, setExpenses] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

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

  return (
    <div className="min-h-screen bg-gray-100">
      <Auth user={user} setUser={setUser} />
      
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
