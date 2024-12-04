const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY'
]

export const validateEnv = () => {
  const missing = []
  const empty = []

  requiredEnvVars.forEach(varName => {
    const value = import.meta.env[varName]
    if (value === undefined) {
      missing.push(varName)
    } else if (value === '') {
      empty.push(varName)
    }
  })

  if (missing.length > 0 || empty.length > 0) {
    console.error('Environment variables validation failed:')
    if (missing.length > 0) {
      console.error('Missing variables:', missing)
    }
    if (empty.length > 0) {
      console.error('Empty variables:', empty)
    }
    throw new Error('Missing required environment variables')
  }

  return true
}
