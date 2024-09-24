import supabase from "../../SupabaseConfig";


export const insertAnnouncement = async (titulo, desc, created, data_evento, link) => {

    try{
      const { data, error } = await supabase
      .from('comunicados')
      .insert([{
        titulo: titulo,
        descricao: desc,
        created_at: created,
        data_evento: data_evento,
        link_externo: link
      },])
      .select()
  
    }catch(err){
      console.log(err);
    }
  }
      