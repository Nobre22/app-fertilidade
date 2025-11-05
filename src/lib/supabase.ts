import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types para as tabelas
export interface User {
  id: string
  email: string
  full_name: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description: string
  created_at: string
}

export interface Post {
  id: string
  title: string
  content: string
  category_id: string
  user_id: string
  created_at: string
  updated_at: string
  category?: Category
  user?: User
}

export interface Comment {
  id: string
  content: string
  post_id: string
  user_id: string
  created_at: string
  user?: User
}