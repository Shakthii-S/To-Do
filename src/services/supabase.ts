
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mhrdnpqhzcszhbiuexip.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ocmRucHFoemNzemhiaXVleGlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMTQwNDYsImV4cCI6MjA2Njg5MDA0Nn0.3K_ru0hbvnsktjtt0hQlgPacrYewPsPGxQaoV-ciUNE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
