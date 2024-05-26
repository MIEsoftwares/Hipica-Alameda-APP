import { supabase } from "../SupabaseConfig";

export async function signUpWithEmail(email, password, name) {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
        email: email,
        password: password,
        displayName: name,
    });
  
    return { session, error };
  };