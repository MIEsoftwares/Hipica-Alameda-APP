import { supabase } from "../SupabaseConfig";

export async function signInWithEmail(email, password) {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  console.log("Dentro do supabase", error, "email", email, "senha", password);
  return error;
};

export async function signUpWithEmail(email, password) {
  const {
    data: { session },
    error,
  } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  return { session, error };
};