import { supabase } from '../config/supabase'

const getHeaders = (userId) => ({
  headers: {
    user_id: userId.toString()
  }
});

export const addExpense = async (expenseData, userId) => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .insert([{
        description: expenseData.description,
        amount: expenseData.amount,
        currency: expenseData.currency,
        category: expenseData.category,
        date: expenseData.date,
        user_id: userId.toString()
      }], getHeaders(userId))
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
      .eq('user_id', userId.toString())
      .order('date', { ascending: false })
      .headers(getHeaders(userId))

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
      .eq('user_id', userId.toString())
      .headers(getHeaders(userId))

    if (error) throw error
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
      if (payload.new && payload.new.user_id === userId.toString()) {
        callback(payload)
      }
    })
    .headers(getHeaders(userId))
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}
