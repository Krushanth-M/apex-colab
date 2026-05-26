import { createClient } from '@supabase/supabase-js';

// Apex Colab Supabase Database Configuration
// Note: Substitute with your live Supabase URL and Anon Key when ready to host.
const supabaseUrl = 'https://fake-supabase-project.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZha2Utc3VwYWJhc2UtcHJvamVjdCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzEzNDg3NjAwLCJleHAiOjIwMjg4NDc2MDB9.FakeSupabaseAnonKeyHere12345';

export const supabase = createClient(supabaseUrl, supabaseKey);
