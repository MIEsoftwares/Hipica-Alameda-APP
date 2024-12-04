import supabase from "../SupabaseConfig";

export async function signUpWithEmail(email, password, name, cpf, phone, hasHorse, horseName, role, tipoDeAula) {
    const {
      error
    } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true,
      user_metadata: {
        nome: name,
        cpf: cpf,
        telefone: phone,
        proprietariodeCavalo: hasHorse,
        nomedocavalo: horseName,
        role: role,
        tipodeaula: "Normal"
      }
    });
    if (error) {
      console.error(error.message);
      return { error };
    }

    return { error };
  };