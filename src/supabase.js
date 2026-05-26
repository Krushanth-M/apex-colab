import { createClient } from '@supabase/supabase-js';

// Apex Colab Supabase Database Configuration
// Note: Substitute with your live Supabase URL and Anon Key when ready to host.
const supabaseUrl = 'https://ywyvijbtfzaqzbjexoux.supabase.co';
const supabaseKey = 'sb_publishable_qQ-Fk_lk1vFUoFN-89h80w_l_LWDf2u';

export const supabase = createClient(supabaseUrl, supabaseKey);
