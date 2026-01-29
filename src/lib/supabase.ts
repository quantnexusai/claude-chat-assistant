import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabasePublishableKey)

export const createServerClient = () => {
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || 'placeholder-secret-key'
  return createClient(supabaseUrl, supabaseSecretKey)
}
