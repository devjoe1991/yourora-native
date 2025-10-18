import { createClient } from '@supabase/supabase-js'

// Supabase configuration - replace with your actual values
const supabaseUrl = 'https://your-project-id.supabase.co'
const supabaseAnonKey = 'your-anon-key-here'

// Service role key - only for admin operations (never expose in client)
const supabaseServiceKey = null // Set this only if you need admin operations

// Main client for user operations (uses anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Enable automatic token refresh
    autoRefreshToken: true,
    // Persist session in AsyncStorage
    persistSession: true,
    // Detect session from URL (for deep linking)
    detectSessionInUrl: false
  }
})

// Admin client for server-side operations (uses service role key)
// ⚠️  WARNING: Only use this for admin operations, never expose to client
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    })
  : null

// Test connection function
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('Supabase connection test failed:', error)
      return { success: false, error: error.message }
    }
    
    console.log('✅ Supabase connection successful!')
    return { success: true, data }
  } catch (error) {
    console.error('Supabase connection test failed:', error)
    return { success: false, error: error.message }
  }
}

export default supabase
