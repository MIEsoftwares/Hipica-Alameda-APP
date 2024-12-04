import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://hiyeyqbmacpuqgmbwyhv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpeWV5cWJtYWNwdXFnbWJ3eWh2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNzI5ODk0MywiZXhwIjoyMDMyODc0OTQzfQ.1_gRKLi1P8xOTY5VgfeMEs2mZZ54POLHG8IMqDEcfXw";
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;