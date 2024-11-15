import supabase from "../../SupabaseConfig";

export const insertPlans = async (nome, duracao, valor, quantidadeaulas) => {

    try{
      const { data, error } = await supabase
      .from('planosaula')
      .insert([{
        nome: nome, 
        duracao: duracao, 
        valor: valor, 
        quantidadeaulas: quantidadeaulas,
      },])
      .select()
  
    }catch(err){
      console.log(err);
    }
  }
      