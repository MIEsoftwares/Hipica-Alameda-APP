import supabase from "../SupabaseConfig";

export const insertAnnouncement = async (titulo, desc, created, dia, hora, link) => {

    try{
      const { data, error} = await supabase
      .from('comunicados')
      .insert([{
        titulo: titulo,
        descricao: desc,
        created_at: created,
        dia_evento: dia,
        horario_evento: hora,
        link_externo: link
      },])
      .select()
  
    }catch(err){
      console.log(err);
    }
  }
      