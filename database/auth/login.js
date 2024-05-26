import { supabase } from "../SupabaseConfig";

export async function signInWithEmail(email, password) {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  return error;
};
