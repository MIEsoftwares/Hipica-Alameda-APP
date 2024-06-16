import supabase from "../SupabaseConfig";

export async function signUpWithEmail(email, password, name, cpf, phone, hasHorse, horseName) {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options:{
        data: {
          nome: name,
          cpf: cpf,
          telefone: phone,
          proprietarioDeCavalo: hasHorse,
          nomeDoCavalo: horseName,
        }
      }
    });
    if (error) {
      console.error(error.message);
      return;
    }

    return { session, error };
  };