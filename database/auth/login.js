import supabase from "../SupabaseConfig";

export async function signInWithEmail(email, senha,) {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    senha: senha,
  });

  return error;
};
