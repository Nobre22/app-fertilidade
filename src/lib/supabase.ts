import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Função para criar cliente Supabase (compatibilidade)
export function createClient() {
  return supabase
}

// Tipos para o banco de dados
export interface Profile {
  id: string
  user_id: string
  name: string
  partner_name?: string
  age?: number
  partner_age?: number
  height?: number
  partner_height?: number
  weight?: number
  partner_weight?: number
  bmi?: number
  partner_bmi?: number
  gender: 'woman' | 'man'
  created_at: string
  updated_at: string
}

export interface MenstrualCycle {
  id: string
  user_id: string
  start_date: string
  end_date?: string
  cycle_length?: number
  fertile_window_start?: string
  fertile_window_end?: string
  ovulation_date?: string
  notes?: string
  symptoms?: any
  temperature?: number
  cervical_mucus?: string
  created_at: string
}

export interface DetoxProgress {
  id: string
  user_id: string
  week_number: number
  completed_tasks: string[]
  progress_percentage: number
  date: string
  created_at: string
  updated_at: string
}

export interface Protocol {
  id: string
  user_id: string
  protocol_type: string
  formulas?: any
  schedule?: any
  progress_percentage: number
  started_at: string
  completed_at?: string
  created_at: string
  updated_at: string
}