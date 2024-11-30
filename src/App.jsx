import { useState, useEffect } from 'react'
import './App.css'
import ExpensesList from './components/ExpensesList'
import ExpenseForm from './components/ExpenseForm'
import Statistics from './components/Statistics'
import Auth from './components/Auth'
import { auth } from './config/firebase'
import { onAuthStateChanged } from 'firebase/auth'

function App() {
  const [expenses, setExpenses] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense])
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Auth user={user} setUser={setUser} />
      
      {user && (
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <ExpenseForm onAddExpense={addExpense} />
            <Statistics expenses={expenses} />
            <ExpensesList expenses={expenses} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
