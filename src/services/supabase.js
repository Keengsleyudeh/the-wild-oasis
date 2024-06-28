
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://xhpulchjrrlylegtsbpc.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhocHVsY2hqcnJseWxlZ3RzYnBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyNzc2NjQsImV4cCI6MjAzMzg1MzY2NH0.P87FTzUxuwF7zcxga7doZErh4nLwewcwGVLeg-_e0vI"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;