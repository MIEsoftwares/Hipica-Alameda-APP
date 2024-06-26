import supabase from "../SupabaseConfig";

export async function signUpWithEmail(email, password, name, cpf, phone, hasHorse, horseName, role) {
    const {
      error
    } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      user_metadata: {
        nome: name,
        cpf: cpf,
        telefone: phone,
        proprietarioDeCavalo: hasHorse,
        nomeDoCavalo: horseName,
        role: role,
      }
    });
    if (error) {
      console.error(error.message);
      return { error };
    }

    return { error };
  };