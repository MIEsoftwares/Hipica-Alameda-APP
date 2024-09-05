import supabase from "../SupabaseConfig";

export const updateAnnouncement = async (id, titulo, descricao, dia_evento, horario_evento, link_externo) => {

    try{
        const {data, error} = await supabase
        .from("comunicados")
        .update({titulo: titulo, descricao: descricao, dia_evento: dia_evento, horario_evento: horario_evento, link_externo: link_externo})
        .eq("id", id)
    }catch(err){
        console.log(err)
    }
}