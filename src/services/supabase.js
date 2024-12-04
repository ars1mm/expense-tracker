import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export const getExpenses = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', userId.toString())
      .order('date', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching expenses:', error)
    throw error
  }
}

export const addExpense = async (expense, userId) => {
  try {
    // Check if a similar expense exists within the last minute (to prevent duplicates)
    const oneMinuteAgo = new Date(Date.now() - 60000).toISOString()
    const { data: existingExpenses } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', userId.toString())
      .eq('description', expense.description)
      .eq('amount', expense.amount)
      .eq('currency', expense.currency)
      .eq('category', expense.category)
      .gte('created_at', oneMinuteAgo)

    if (existingExpenses && existingExpenses.length > 0) {
      console.warn('Similar expense detected within the last minute, preventing duplicate')
      return existingExpenses[0]
    }

    const { data, error } = await supabase
      .from('expenses')
      .insert([{
        description: expense.description,
        amount: expense.amount,
        currency: expense.currency,
        category: expense.category,
        date: expense.date,
        user_id: userId.toString()
      }])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error adding expense:', error)
    throw error
  }
}

export const deleteExpense = async (id, userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required to delete an expense')
    }

    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)
      .eq('user_id', userId.toString())

    if (error) throw error
  } catch (error) {
    console.error('Error deleting expense:', error)
    throw error
  }
}

export const subscribeToExpenses = (callback, userId) => {
  const subscription = supabase
    .channel('public:expenses')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'expenses',
        filter: `user_id=eq.${userId.toString()}`
      },
      (payload) => {
        console.log('Received real-time update:', payload)
        callback(payload)
      }
    )
    .subscribe((status) => {
      console.log('Subscription status:', status)
    })

  return () => {
    console.log('Unsubscribing from expenses channel')
    subscription.unsubscribe()
  }
}
