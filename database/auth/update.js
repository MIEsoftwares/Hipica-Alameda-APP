import supabase from "../SupabaseConfig"

export const updateUser = async (id, email, nome, cpf, telefone, hasHorse, horseName, role) => {

    try{
        const {data, error} = await supabase
        .from("profiles")
        .update({email: email, nome: nome, cpf: cpf, telefone: telefone, proprietariodecavalo: hasHorse, nomedocavalo: horseName, role: role})
        .eq("id", id)
    }catch(err){
        console.log(err)
    }
}