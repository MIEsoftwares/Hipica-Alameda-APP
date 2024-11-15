import supabase from "../../SupabaseConfig"

export const updatePlans = async (id, nome, duracao, valor, quantidadeaulas) => {

    try{
        const {data, error} = await supabase
        .from("planosaula")
        .update({nome: nome, duracao: duracao, valor: valor, quantidadeaulas: quantidadeaulas})
        .eq("id", id)
    }catch(err){
        console.log(err)
    }
}