import { supabase } from '../config/supabase'

export const addExpense = async (expenseData, userId) => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .insert([
        {
          description: expenseData.description,
          amount: expenseData.amount,
          currency: expenseData.currency,
          category: expenseData.category,
          date: expenseData.date,
          user_id: userId
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

export const getExpenses = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error getting expenses:', error)
    throw error
  }
}

export const deleteExpense = async (id, userId) => {
  try {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)
      .eq('user_id', userId) // Only delete if the expense belongs to the user

    if (error) throw error
    return id
  } catch (error) {
    console.error('Error deleting expense:', error)
    throw error
  }
}

// Real-time subscription for expenses
export const subscribeToExpenses = (callback, userId) => {
  const subscription = supabase
    .from('expenses')
    .on('*', payload => {
      // Only notify about changes to the user's expenses
      if (payload.new && payload.new.user_id === userId) {
        callback(payload)
      }
    })
    .eq('user_id', userId)
    .subscribe()

  return () => {
    supabase.removeSubscription(subscription)
  }
}
