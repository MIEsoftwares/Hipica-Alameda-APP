import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "Database URL"
const supabaseKey = "service_role secret Key"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase