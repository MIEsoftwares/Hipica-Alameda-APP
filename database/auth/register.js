import supabase from "../SupabaseConfig";

export async function signUpWithEmail(email, nome, senha, cpf, telefone, proprietario_de_cavalo, nome_do_cavalo) {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      nome: nome,
      email: email,
      senha: senha,
      cpf: cpf,
      telefone: telefone,
      proprietario_de_cavalo: proprietario_de_cavalo,
      nome_do_cavalo: nome_do_cavalo,
    });
  
    return { session, error };
  };