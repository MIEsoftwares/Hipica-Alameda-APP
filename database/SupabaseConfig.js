import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wxmasywkvxmgjlhqgjfp.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bWFzeXdrdnhtZ2psaHFnamZwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNTg5MTQ3NywiZXhwIjoyMDMxNDY3NDc3fQ.0GonEP_vuqVz3uUMKwSd76b-cslHITnPcN4oV_oS6JU"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase