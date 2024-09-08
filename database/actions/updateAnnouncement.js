import supabase from "../SupabaseConfig";

export const updateAnnouncement = async (id, titulo, descricao, data_evento, link_externo) => {

    try{
        const {data, error} = await supabase
        .from("comunicados")
        .update({titulo: titulo, descricao: descricao, data_evento: data_evento, link_externo: link_externo})
        .eq("id", id)
    }catch(err){
        console.log(err)
    }
}