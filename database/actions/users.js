import supabase from "../SupabaseConfig";


export const insert = async (item) => {

  try{
    const { data, error} = await supabase
    .from('teste')
    .insert({
        name: item
    })

    console.log("Item adicionado com sucecsso ao banco de dados");

  }catch(err){
    console.log(err);
  }
    
};
