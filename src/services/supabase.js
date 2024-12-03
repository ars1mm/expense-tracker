import { supabase } from '../config/supabase'

export const addExpense = async (expenseData) => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .insert([
        {
          description: expenseData.description,
          amount: expenseData.amount,
          currency: expenseData.currency,
          category: expenseData.category,
          date: expenseData.date
        }
      ])
      .select()

    if (error) throw error
    return data[0]
  } catch (error) {
    console.error('Error adding expense:', error)
    throw error
  }
}

export const getExpenses = async () => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('date', { ascending: false })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error getting expenses:', error)
    throw error
  }
}

export const deleteExpense = async (id) => {
  try {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)

    if (error) throw error
    return id
  } catch (error) {
    console.error('Error deleting expense:', error)
    throw error
  }
}

// Real-time subscription for expenses
export const subscribeToExpenses = (callback) => {
  const subscription = supabase
    .from('expenses')
    .on('*', payload => {
      callback(payload)
    })
    .subscribe()

  return () => {
    supabase.removeSubscription(subscription)
  }
}
